import {
	IonContent,
	IonPage,
	IonGrid,
	IonRow,
	IonCol,
	IonAvatar,
	IonList,
	IonButton
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { FooterNav } from '../components/FooterNav';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import '../assets/dashboard.css';
import { useAuth0 } from "@auth0/auth0-react";
import Loading from '../components/Loading';
import { Activity, ActivityFooter, CommentField, CommentItem, CommentList, FlatFeed, InfiniteScrollPaginator, LikeButton, NotificationDropdown, StatusUpdateForm, StreamApp, UserBar } from 'react-activity-feed';

const Dashboard: React.FC = (props: any) => {
	const history = useHistory();
	const [ avatar, setAvatar ] = useState<string>('');
	const [ shares, setShares ] = useState<any>([]);
	const [ total, setTotal ] = useState<any>(0.00);
	const [ fullName, setFullName ] = useState<string>('');
	const [ email, setEmail] = useState<string>('');
	const [ phone, setPhone ] = useState<string>('');
	const [ feed, setFeed ] = useState<any>();
	const { user, isAuthenticated, isLoading } = useAuth0();

	function follow() {

	}

	useEffect(()=> {
		if (user) {
			const api = axios.create({
				baseURL: process.env.REACT_APP_GAINVEST_API
				//baseURL: 'http://localhost:3000'
			});
			api.get(`/private-shares/investor/${user.email}`).then((response) => {
				const shares = response.data;
				let total = 0.00;
	
				shares.map((item:any) => {
					total += parseFloat(item.transaction_amount);
				})
	
				setTotal(total);
				setShares(shares);
			}).catch((error) => {});
	
			api.get(`/users/${user.email}`).then((response) => {
				const current_user = response.data;
				setFullName(current_user.first_name + ' ' + current_user.middle_name + ' ' + current_user.last_name);
				setPhone(current_user.phone);
				setAvatar('https://getstream.io/random_svg/?name=' + user.username);
				const api_key = process.env.REACT_APP_STREAM_API_KEY || '';
				const app_id = process.env.REACT_APP_STREAM_APP_ID || '';
				let token = '';

				if (user.user_metadata && user.user_metadata.stream_token) {
					token = user.user_metadata.stream_token;
				}
				else {
					token = current_user.token;
				}

				const activityFeed = <StreamApp apiKey={api_key} appId={app_id} token={token}>
                                        <div className="wrapper box">
                                            <h3 style={{marginLeft: '10px'}}>Timeline</h3>
                                            {/* <NotificationDropdown 
                                                right
                                                feedGroup="Notification" 
                                                notify
                                            /> */}
                                            
                                        </div>
                                        <FlatFeed
                                            notify
                                            feedGroup="Feed"
                                            options={{ limit: 6, withOwnChildren: true, withRecentReactions: true }}
                                            Paginator={InfiniteScrollPaginator}
                                            userId={current_user.first_name+current_user.last_name}
                                            Activity={({ activity, feedGroup, userId }:any) => { console.log(activity);return (
                                                <Activity
                                                activity={activity}
                                                feedGroup={feedGroup}
                                                userId={userId}
                                                Header={({ activity }:any) => (
                                                    <UserBar
                                                        username={activity.actor.id}
                                                        avatar={"https://getstream.io/random_svg/?name=" + activity.actor.id}
                                                        AfterUsername={<label>Developer</label>}
                                                        timestamp="2020-09-19T07:44:11+00:00"
                                                        subtitle="Gainvest"
                                                        
                                                    />
                                                )}
                                                Footer={() => (
                                                    <>
                                                    <ActivityFooter activity={activity} feedGroup={feedGroup} userId={userId} />
                                                    <CommentField activity={activity} />
                                                    <CommentList
                                                        activityId={activity.id}
                                                        CommentItem={({ comment }) => (
                                                        <div className="wrapper">
                                                            <CommentItem comment={comment} />
                                                            <LikeButton reaction={comment} />
                                                        </div>
                                                        )}
                                                    />
                                                    </>
                                                )}
                                                />
                                            )}}
                                        />
                                    </StreamApp>
				setFeed(activityFeed);
			}).catch((error) => {});
		}
		
	}, [user]);

	if (isLoading) {
		return (
			<IonPage>
				<Loading />
			</IonPage>
		);
	}

	return (
		<IonPage>
			<Header />

			<IonContent>
				<div className="back" style={{ background: '#053359' }}>
					<IonGrid>
						<IonRow className="user-detail-bar">
							<IonCol className="section">
								<div>
									<IonAvatar style={{ height: '90px', width: '90px' }}>
										<img alt="" src={avatar} />
									</IonAvatar>
								</div>
								<div
									style={{
										alignItems: 'center',
										textTransform: 'capitalize'
									}}
								>
									<h3 style={{ paddingTop: '15px', margin: '0px', fontWeight: 'bold'}}>
										{fullName}
									</h3>
								</div>
								<div>
									<h5 style={{ padding: '0px', margin: '0px', fontSize: '15px' }}>
										@{user?.nickname}
									</h5>
								</div>
							</IonCol>
							<IonCol className="section">
								<IonButton style={{ fontWeight: 'bold', maxWidth:'100px', position: 'absolute', right: '5%', top: '30%' }} onClick={follow} expand="block">
									Follow
								</IonButton>
							</IonCol>
						</IonRow>
						
							{feed}
						
						<IonRow className='section-header'>
							<h3>Investments: {shares.length}</h3>
							<h3 className="align-right">Total: ${total}</h3>
						</IonRow>
						<IonList className="docs-list">
                            {
                                shares.map((val:any, index:any) => {
									return <IonRow key={"fund-container" + index} className="fund-container">
												<IonRow key={"fund-header" + index} style={{ width: '100%'}} className="fund-header"><IonCol key={"innerCol" + index}>{val.current_company_name}</IonCol><IonCol className="align-right">${val.transaction_amount}</IonCol></IonRow>
												<IonRow key={"1fund-row" + index} style={{ width: '100%'}} className="fund-row">
													<IonCol key={"startDateCol" + index}><div key={"1startDateDiv" + index} style={{marginBottom: '5px'}}>Shares: <span key={"2startDateDiv" + index} style={{fontWeight: 'bold'}}>{val.number_of_shares}</span></div></IonCol>
													<IonCol className="align-right" key={"fundSizeCol" + index}><div key={"1fundSizeDiv" + index} style={{marginBottom: '5px'}}>Price: <span key={"2fundSizeDiv" + index} style={{fontWeight: 'bold'}}>${val.share_price_current}</span></div></IonCol>
													{/* <IonCol key={"issueDateCol" + index}><div key={"1issueDateDiv" + index} style={{textDecoration: 'underline', marginBottom: '5px'}}>Date Purchased</div><div key={"2issueDateDiv" + index} style={{fontWeight: 'bold'}}>{val.issue_date}</div></IonCol> */}
												</IonRow>
											</IonRow>
   
                                })
                            }
                        </IonList>
					</IonGrid>
				</div>
			</IonContent>
			<FooterNav />
		</IonPage>
	);
};

export default Dashboard;
