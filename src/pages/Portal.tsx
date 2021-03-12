import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButtons,
	IonItem,
	IonLabel,
	IonInput,
	IonCheckbox,
	IonButton,
	IonRow,
	IonCol,
	IonFooter,
	IonApp,
	IonAlert,
	IonIcon,
	IonImg
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import '../assets/gainvest.css';
import { personCircle } from 'ionicons/icons';
import { Header }  from '../components/Header';
import { Footer }  from '../components/Footer';
import { UserContext } from '../contexts/UserContext';


const Portal: React.FC = () => {
	const history = useHistory();
	const [ email, setEmail ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('');
	const [ iserror, setIserror ] = useState<boolean>(false);
	const [ message, setMessage ] = useState<string>('');
	const [ token, setToken ] = useState<string>('');
	const [ chatToken, setChatToken ] = useState<string>('');
	const [ firstName, setFirstName ] = useState<string>('');
	const [ lastName, setLastName ] = useState<string>('');
	const [ id, setId ] = useState<string>('');
	const [ chatApiKey, setChatApiKey ] = useState<string>('');
	const [ chatId, setChatId ] = useState<string>('');
	const [ isLoggedIn, setIsLoggedIn ] = useState<boolean>(false);

	function validateEmail(email: string) {
		const regexp = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		return regexp.test(String(email).toLowerCase());
	}

	const handleLogin = async (event: { preventDefault: () => void }) => {
		if (!email) {
			setMessage('Please enter a valid email');
			setIserror(true);
			return;
		}
		if (validateEmail(email) === false) {
			setMessage('Your email is invalid');
			setIserror(true);
			return;
		}

		if (!password || password.length < 6) {
			setMessage('Please enter your password');
			setIserror(true);
			return;
		}

		const loginData = {
			email: email,
			password: password
		};

		const api = axios.create({
			baseURL: 'https://gainvest-api.com'
			//baseURL: 'http://localhost:3000'
		});
		api
			.post('/users/login', loginData)
			.then((response) => {
				setToken(response.data.token);
				setChatToken(response.data.chatToken);
				setFirstName(response.data.firstName);
				setLastName(response.data.lastName);
				setEmail(response.data.email);
				setId(response.data.id);
				setChatApiKey(response.data.chatApiKey);
				setChatId(response.data.chatId);
				setIsLoggedIn(true);

				history.push({
					pathname: '/dashboard',
					state: {
						data: {
							token: response.data.token,
							chatToken: response.data.chatToken,
							firstName: response.data.firstName,
							lastName: response.data.lastName,
							email: response.data.email,
							id: response.data.userId,
							chatApiKey: response.data.chatApiKey,
							chatId: response.data.chatId
						}
					}
				});
			})
			.catch((error) => {
				setMessage('Email and/or Password Is Incorrect');
				setIserror(true);
			});
	};

	return (
			<IonPage>
				{/* <IonHeader>
					<IonToolbar color="dark">
						<IonTitle>Gainvest Marketplace</IonTitle>
						<IonButtons slot="end">
							<NavButtons />
						</IonButtons>
					</IonToolbar>
				</IonHeader> */}
				{/* <Header/> */}
				{/* <UserContext.Consumer>
					{user => {
						user.token = token;
						user.firstName = firstName;
						user.lastName = lastName;
						user.email = email;
						user.id = id;
						user.chatApiKey = chatApiKey;
						user.chatToken = chatToken;
						user.chatId = chatId;

						return ( */}
							<IonContent class="space-bg" fullscreen>
								<IonRow>
									<IonCol>
										<IonAlert
											isOpen={iserror}
											onDidDismiss={() => setIserror(false)}
											cssClass="my-custom-class"
											header={'Error!'}
											message={message}
											buttons={[ 'Dismiss' ]}
										/>
									</IonCol>
								</IonRow>
								<IonRow>
									<IonCol class="logo-container">
										<IonImg class="logo" src='https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png' />
									</IonCol>
								</IonRow>
								<form className="form">
									<IonItem class="login-input">
										<IonLabel position="floating">Email</IonLabel>
										<IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
									</IonItem>
									<IonItem class="login-input">
										<IonLabel position="floating">Password</IonLabel>
										<IonInput
											type="password"
											value={password}
											onIonChange={(e) => setPassword(e.detail.value!)}
										/>
									</IonItem>
									{/* <IonRow>
										<IonCol>
											<IonItem lines="none">
												<IonLabel>Remember Me</IonLabel>
												<IonCheckbox defaultChecked={true} slot="start" />
											</IonItem>
										</IonCol>
										<IonCol>
											<IonItem lines="none">
												<IonLabel>
													<a href="/forgotpass">Forgot Password?</a>
												</IonLabel>
											</IonItem>
										</IonCol>
									</IonRow> */}
									<IonButton className="ion-margin-top" onClick={handleLogin} expand="block">
										Login
									</IonButton>
									<p style={{ fontSize: 'medium', textAlign: 'center', color:'#000', marginTop: '30px' }}>
										Don't have an account? <a href="/signup">Sign up!</a>
									</p>
								</form>
								{/* <IonRow>
									<IonCol>
										
									</IonCol>
								</IonRow> */}
							</IonContent>
						{/* )
					}} */}
				{/* </UserContext.Consumer> */}
			</IonPage>
	);
};

export default Portal;
