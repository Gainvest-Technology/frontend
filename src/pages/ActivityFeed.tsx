import React, { useState, useEffect, useContext } from 'react';
import {
    StreamApp,
    StatusUpdateForm,
    FlatFeed,
    NotificationDropdown,
    Activity,
    ActivityFooter,
    LikeButton,
    CommentField,
    CommentList,
    CommentItem,
    InfiniteScrollPaginator,
    UserBar,
  } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
import {
	IonContent,
	IonPage,
	IonToolbar,
	IonRow,
	IonCol,
	IonIcon,
	IonLabel
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Header }  from '../components/Header';
import { businessSharp, chatboxEllipsesSharp, documentsSharp, gridOutline, homeSharp } from 'ionicons/icons';
//import async from 'async';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { FooterNav } from '../components/FooterNav';
import Loading from '../components/Loading';


const GainvestActivityFeed: React.FC = (props: any) => {
	const [ chatStyle, setChatStyle ] = useState<string>('messaging light');
	const [ activityFeed, setActivityFeed ] = useState<any>();
	const history = useHistory();
    const { user, isAuthenticated, isLoading } = useAuth0();
	

	const [chatClient, setChatClient] = useState<any>();

	useEffect(() => {
		if (user) {
            const api = axios.create({
				baseURL: 'https://gainvest-api.com'
				// baseURL: 'http://localhost:3000'
			});

            api.get(`/users/${user.email}`).then((response) => {
				const current_user = response.data;
				const firstName = current_user.first_name;
                const lastName = current_user.last_name;
                const token = current_user.token;
                const chatApiKey = current_user.chatApiKey;
                const appId = current_user.appId;

                const activityFeed = <StreamApp apiKey={chatApiKey} appId={appId} token={token}>
                                        <div className="wrapper box">
                                            <h3 style={{marginLeft: '10px'}}>People You Follow</h3>
                                            {/* <NotificationDropdown 
                                                right
                                                feedGroup="Notification" 
                                                notify
                                            /> */}
                                            
                                        </div>
                                        <StatusUpdateForm feedGroup="Feed" />
                                        <FlatFeed
                                            notify
                                            feedGroup="Feed"
                                            options={{ limit: 6, withOwnChildren: true, withRecentReactions: true }}
                                            Paginator={InfiniteScrollPaginator}
                                            userId={firstName+lastName}
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

                setActivityFeed(activityFeed);
			}).catch((error) => {});

		}
	},[user]);


	// function changeTheme() {
	// 	if (theme === 'light') {
	// 		setChatStyle('messaging dark');
	// 		setTheme('dark');
	// 	}
	// 	else {
	// 		setChatStyle('messaging light');
	// 		setTheme('light');
	// 	}
	// }

    if (isLoading) {
		return (
			<IonPage>
				<Loading />
			</IonPage>
		);
	}
	
	return(
			<IonPage>
				<IonContent>
					<Header/>
					{activityFeed}
				</IonContent>
				<FooterNav/>
			</IonPage>
	)
}

export default GainvestActivityFeed; 