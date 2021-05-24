import {
	IonContent,
	IonPage,
	IonItem,
	IonLabel,
	IonInput,
	IonButton,
	IonRow,
	IonCol,
	IonAlert,
	IonImg,
	IonFooter,
	IonToolbar
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

import '../assets/gainvest.css';

const Portal: React.FC = () => {
	const history = useHistory();
	const [ email, setEmail ] = useState<string>('');
	const [ password, setPassword ] = useState<string>('');
	const [ iserror, setIserror ] = useState<boolean>(false);
	const [ message, setMessage ] = useState<string>('');

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
				if (response.data.needsUpdate) {
					history.push({
						pathname: '/new_password',
						state: {
							data: {
								email: response.data.email
							}
						}
					});
				} else {
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
				}
			})
			.catch((error) => {
				setMessage('Email and/or Password Is Incorrect');
				setIserror(true);
			});
	};

	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="backy" style={{ height: '100%', width: '100%', background: '#203354' }}>
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
							<IonImg
								class="logo"
								src="https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png"
							/>
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
						<IonButton className="ion-margin-top" onClick={handleLogin} expand="block">
							Login
						</IonButton>
						<p style={{ fontSize: 'medium', textAlign: 'center', color: '#000', marginTop: '30px' }}>
							Don't have an account? <a href="/signup">Sign up!</a>
						</p>
					</form>
				</div>
			</IonContent>
			<IonFooter>
				<IonToolbar color="dark">
					<p style={{ fontSize: 'medium', textAlign: 'center', paddingBottom: '0px' }}>
						&copy; 2021 Gainvest Holdings LLC All rights reserved.
					</p>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default Portal;
