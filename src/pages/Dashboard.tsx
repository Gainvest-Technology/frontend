import {
	IonContent,
	IonPage,
	IonIcon,
	IonGrid,
	IonRow,
	IonCol,
	IonAvatar,
	IonLabel,
	IonCard,
	IonCardHeader,
	IonCardContent,
	IonToolbar
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import {
	logoUsd,
	businessSharp,
	peopleSharp,
	calendarSharp,
	homeSharp,
	chatboxEllipsesSharp,
	documentsSharp,
	bluetooth,
	cashSharp
} from 'ionicons/icons';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import '../assets/dashboard.css';
import { reduxMiddleware } from 'logrocket';

const Dashboard: React.FC = (props: any) => {
	const history = useHistory();
	//const [ startDate, setStartDate ] = useState<any>(undefined);
	const [ investorName, setInvestorName ] = useState<string>('');
	const [ avatar, setAvatar ] = useState<string>('');
	const [ userData, setUserData ] = useState<any>({});

	let today = new Date();
	let dd = today.getDate();
	let mm = today.getMonth() + 1; //As January is 0.
	let yyyy = today.getFullYear();

	const startDate = mm + '/' + dd + '/' + yyyy;

	// const user = useContext(UserContext);

	const [ pageData, setPageData ] = useState<any>({
		token: '',
		chatToken: '',
		firstName: '',
		lastName: '',
		email: '',
		id: '',
		chatApiKey: '',
		chatId: '',
		avatar: '',
		capitalAmount: 0.0,
		fundCount: 0,
		fundNames: [],
		investorData: {},
		capital: [],
		fund_shares: [],
		documents: [],
		showDetails: false,
		activeFunds: []
	});

	useEffect(
		() => {
			if (props.location.state) {
				const firstName = props.location.state.data.firstName;
				const lastName = props.location.state.data.lastName;
				const name = firstName + ' ' + lastName;

				const chatId = props.location.state.data.chatId;
				const token = props.location.state.data.chatToken;
				const chatApiKey = props.location.state.data.chatApiKey;

				setAvatar('https://getstream.io/random_svg/?name=' + firstName);

				const investor = firstName + ' ' + lastName;
				//const investor = 'Andre Harewood';

				const api = axios.create({
					baseURL: 'https://gainvest-api.com'
				});
				api
					.get(`/capitals/investor/${investor}`)
					.then((response) => {
						let total_amount: number = 0.0;
						let total_funds: any = [];

						response.data.map((item: any) => {
							let raw_amount = item.capital_transfer_amount.replace('$', '').replace(',', '');
							total_amount += parseFloat(raw_amount);

							if (total_funds.indexOf(item.fund_name < 0)) {
								total_funds.push(item.fund_name);
							}
						});

						const formattedCapital: any = total_amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');

						setPageData({
							token: props.location.state.data.token,
							chatToken: props.location.state.data.chatToken,
							firstName: props.location.state.data.firstName,
							lastName: props.location.state.data.lastName,
							email: props.location.state.data.email,
							id: props.location.state.data.id,
							chatApiKey: props.location.state.data.chatApiKey,
							chatId: props.location.state.data.chatId,
							avatar: 'https://getstream.io/random_svg/?name=' + firstName,
							capitalAmount: formattedCapital,
							fundCount: total_funds.length
						});
					})
					.catch((error) => {});
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

	return (
		<IonPage>
			<Header />

			<IonContent>
				<div className="back" style={{ background: '#00022e' }}>
					<h1 className="h1" style={{ paddingTop: '15px', fontSize: '15px' }}>
						Gainvestor Snapshot
					</h1>
					<IonGrid>
						<IonRow>
							<IonCol>
								<div
									className="flex-container"
									style={{ alignItems: 'center', padding: '0px', margin: '0px' }}
								>
									<IonAvatar style={{ flex: '1', height: '90px', maxWidth: '90px' }}>
										<img alt="" src={pageData.avatar} />
									</IonAvatar>
								</div>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<div
									className="flex-container"
									style={{
										alignItems: 'center',
										textTransform: 'capitalize'
									}}
								>
									<h3 style={{ paddingTop: '15px', margin: '0px' }}>
										{pageData.firstName + ' ' + pageData.lastName}
									</h3>
								</div>
							</IonCol>
						</IonRow>
						<IonRow>
							<IonCol>
								<div
									className="flex-container"
									style={{
										flex: '1',
										alignItems: 'center',
										textTransform: 'capitalize'
									}}
								>
									<h5 style={{ padding: '0px', margin: '0px', fontSize: '15px' }}>
										{pageData.email}
									</h5>
								</div>
							</IonCol>
						</IonRow>
						<div className="bandWhole">
							<div className="band">
								<IonRow style={{ margin: '0 auto' }}>
									<IonCard
										style={{
											width: '130px',
											height: '130px',
											background: '#a2e5d4',
											color: '#fff',
											borderRadius: '20px'
										}}
									>
										<IonCardHeader style={{ color: '#fff' }}>Amount Invested</IonCardHeader>
										<IonCardContent>
											<IonIcon
												icon={logoUsd}
												style={{ position: 'relative', top: '3px', color: '#fff' }}
											/>
											{pageData.capitalAmount}
										</IonCardContent>
									</IonCard>

									<IonCard
										style={{
											width: '130px',
											height: '130px',
											background: '#33a0ff',
											color: '#fff',
											borderRadius: '20px'
										}}
									>
										<IonCardHeader style={{ color: '#fff' }}>Total Funds Invested</IonCardHeader>
										<IonCardContent>{pageData.fundCount}</IonCardContent>
									</IonCard>
								</IonRow>
							</div>
							<div className="band2">
								<IonRow style={{ margin: '0 auto' }}>
									<IonCard
										style={{
											width: '130px',
											height: '130px',
											background: '#ff4a33',
											color: '#fff',
											borderRadius: '20px'
										}}
									>
										<IonCardHeader style={{ color: '#fff' }}>Gainvest Interactions</IonCardHeader>
										<IonCardContent>0</IonCardContent>
									</IonCard>

									<IonCard
										style={{
											width: '130px',
											height: '130px',
											background: '#ffcf33',
											borderRadius: '20px',
											color: '#fff'
										}}
									>
										<IonCardHeader style={{ color: '#fff' }}>Days as a Gainvestor</IonCardHeader>
										<IonCardContent>1</IonCardContent>
									</IonCard>
								</IonRow>
							</div>
						</div>
					</IonGrid>
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
						<div className="home" style={{ display: 'flex', alignItems: 'center', color: '#0090d4' }}>
							<IonIcon style={{ flex: '1' }} icon={homeSharp} />
						</div>
						<IonLabel style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: '#0090d4' }}>
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
						<IonLabel
							style={{
								display: 'block',
								textAlign: 'center',
								fontSize: '11px',
								color: '#ffffff'
							}}
						>
							Portfolio
						</IonLabel>
					</IonCol>
					<IonCol
						className="nav-toolbar-item"
						onClick={() => {
							navigate('/funds');
						}}
					>
						<div className="funds" style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
							<IonIcon style={{ flex: '1' }} icon={businessSharp} />
						</div>
						<IonLabel
							className="funds1"
							style={{ display: 'block', textAlign: 'center', fontSize: '11px', color: '#f8f8ff' }}
						>
							Funds
						</IonLabel>
					</IonCol>
				</IonRow>
			</IonToolbar>
		</IonPage>
	);
};

export default Dashboard;
