import {
	IonContent,
	IonPage,
	IonIcon,
	IonGrid,
	IonRow,
	IonCol,
	IonApp,
	IonLabel,
	IonToolbar,
	IonSpinner
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { Header } from '../components/Header';
import { Loader } from '../components/Loader';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import {
	addCircle,
	atCircle,
	businessSharp,
	caretDownSharp,
	chatboxEllipsesSharp,
	chevronDownSharp,
	documentsSharp,
	homeSharp
} from 'ionicons/icons';
import { any } from 'async';

import '../assets/funds.css';

const Dashboard: React.FC = (props: any) => {
	const [ isLoading, setIsLoading ] = useState<any>(true);

	const history = useHistory();
	// const [ capital, setCapital ] = useState<number>(0.00);
	// const [ fundCount, setFundCount ] = useState<number>(0);
	// const [ investorName, setInvestorName ] = useState<string>('');
	// const [ avatar, setAvatar ] = useState<string>('');
	// const [ userData, setUserData ] = useState<any>({});
	// const [ allFunds, setAllFunds ] = useState<any>();

	const [ pageData, setPageData ] = useState<any>({
		token: '',
		chatToken: '',
		firstName: '',
		lastName: '',
		email: '',
		id: '',
		chatApiKey: '',
		chatId: '',
		activeFunds: []
	});

	useEffect(
		() => {
			if (props.location.state) {
				const api = axios.create({
					baseURL: 'https://gainvest-api.com'
					//baseURL: 'http://localhost:3000'
				});
				setIsLoading(true);
				api.get(`/funds`).then((response) => {
					const data = response.data;

					function checkActive(fund: any) {
						if (fund.status === 'Active' || fund.status === 'Open') {
							return true;
						} else {
							setIsLoading(false);
							return false;
						}
					}

					const activeFunds = data.filter(checkActive);

					setPageData({
						token: props.location.state.data.token,
						chatToken: props.location.state.data.chatToken,
						firstName: props.location.state.data.firstName,
						lastName: props.location.state.data.lastName,
						email: props.location.state.data.email,
						id: props.location.state.data.id,
						chatApiKey: props.location.state.data.chatApiKey,
						chatId: props.location.state.data.chatId,
						activeFunds: activeFunds
					});
				});
			}
		},
		[ props ]
	);

	function navigate(route: string) {
		history.push({
			pathname: route,
			state: {
				data: {
					token: pageData.token,
					chatToken: pageData.chatToken,
					firstName: pageData.firstName,
					lastName: pageData.lastName,
					email: pageData.email,
					id: pageData.id,
					chatApiKey: pageData.chatApiKey,
					chatId: pageData.chatId
				}
			}
		});
	}

	const colors = [ '#0088FE', '#00C49F', '#FFBB28', '#FF8042' ];

	return (
		<IonPage>
			<Header />
			<IonContent className="light">
				<div className="backer">
					<h1 className="h1" style={{ paddingTop: '15px' }}>
						Available Funds
					</h1>

					{isLoading === true ? (
						<Loader />
					) : (
						<IonGrid>
							{pageData.activeFunds.map((fund: any, index: any) => {
								const key: any = fund.name + index;
								return (
									<IonRow key={'fund-container' + index} className="fund-container box-shadow">
										<IonRow
											key={'fund-header' + index}
											style={{ width: '100%', color: '#fff' }}
											className="fund-header"
										>
											<IonCol key={'innerCol' + index} style={{ textAlign: 'left' }}>
												{fund.name}
											</IonCol>
										</IonRow>
										<IonRow
											key={'1fund-row' + index}
											style={{ width: '100%', color: '#d3d3d3' }}
											className="fund-row"
										>
											<IonCol key={'startDateCol' + index}>
												<div
													key={'1startDateDiv' + index}
													style={{
														marginBottom: '10px',
														textAlign: 'left',
														color: '#fff'
													}}
												>
													Start Date <span> | </span>
													{fund.start_date}
												</div>
											</IonCol>
										</IonRow>
										<IonRow style={{ width: '100%' }}>
											<IonCol key={'fundSizeCol' + index}>
												<div
													key={'2fundSizeDiv' + index}
													style={{
														fontWeight: 'bold',
														color: '#fff',
														fontSize: '30px',
														width: '100%',
														textAlign: 'left'
													}}
												>
													{fund.total_fund_size}
													<span> </span>
													<span style={{ fontSize: '15px' }}>Fund size</span>
												</div>
											</IonCol>
										</IonRow>
										<IonRow
											key={'2fund-row' + index}
											style={{ width: '100%' }}
											className="fund-row"
										>
											<IonCol key={'learnMoreCol' + index}>
												<a
													key={'learnMoreAnc' + index}
													className="learn-more"
													href={fund.description}
												>
													Learn More
													<IonIcon
														icon={caretDownSharp}
														style={{ marginLeft: '2px', marginTop: '20px' }}
													/>
												</a>
											</IonCol>
											<IonCol key={'investCol' + index}>
												<a key={'investAnc' + index} className="invest" href={fund.invest_rich}>
													Invest
													<IonIcon
														icon={caretDownSharp}
														style={{ marginLeft: '2px', marginTop: '20px' }}
													/>
												</a>
											</IonCol>
										</IonRow>
									</IonRow>
								);
							})}
						</IonGrid>
					)}
				</div>
			</IonContent>

			<IonToolbar slot="bottom" className="menu-tabs" style={{ paddingBottom: '20px' }}>
				<IonRow>
					<IonCol
						className="nav-toolbar-item"
						onClick={() => {
							navigate('/dashboard');
						}}
					>
						<div className="home" style={{ display: 'flex', alignItems: 'center' }}>
							<IonIcon style={{ flex: '1' }} icon={homeSharp} />
						</div>
						<IonLabel style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: '#fff' }}>
							Home
						</IonLabel>
					</IonCol>
					<IonCol
						className="nav-toolbar-item"
						onClick={() => {
							navigate('/chat');
						}}
					>
						<div className="chat" style={{ display: 'flex', alignItems: 'center' }}>
							<IonIcon style={{ flex: '1' }} icon={chatboxEllipsesSharp} />
						</div>
						<IonLabel style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: '#fff' }}>
							Chat
						</IonLabel>
					</IonCol>
					<IonCol
						className="nav-toolbar-item"
						onClick={() => {
							navigate('/documents');
						}}
					>
						<div className="portfolio" style={{ display: 'flex', alignItems: 'center' }}>
							<IonIcon style={{ flex: '1' }} icon={documentsSharp} />
						</div>
						<IonLabel style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: '#fff' }}>
							Portfolio
						</IonLabel>
					</IonCol>
					<IonCol
						className="nav-toolbar-item"
						onClick={() => {
							navigate('/funds');
						}}
					>
						<div className="funds" style={{ display: 'flex', alignItems: 'center', color: '#0090d4' }}>
							<IonIcon style={{ flex: '1' }} icon={businessSharp} />
						</div>
						<IonLabel style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: '#0090d4' }}>
							Funds
						</IonLabel>
					</IonCol>
				</IonRow>
			</IonToolbar>
		</IonPage>
	);
};

export default Dashboard;
