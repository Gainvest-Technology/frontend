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
	IonIcon
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './Home.css';
import { personCircle } from 'ionicons/icons';

import { NavButtons } from '../components/NavButtons';

const Portal: React.FC = () => {
	const history = useHistory();
	const [ email, setEmail ] = useState<string>('todd@gmail.com');
	const [ password, setPassword ] = useState<string>('indians1');
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
			baseURL: `http://gainvest-api.com/`
		});
		api
			.post('/users/login', loginData)
			.then(() => {
				history.push('/profile/' + email);
			})
			.catch((error) => {
				setMessage('Auth failure! Please create an account');
				setIserror(true);
			});
	};

	return (
		<IonApp>
			<IonPage>
				<IonHeader>
					<IonToolbar color="dark">
						<IonTitle>Gainvest Marketplace</IonTitle>
						<IonButtons slot="end">
							<NavButtons />
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent fullscreen>
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
						<IonCol>
							<IonIcon style={{ fontSize: '70px', color: '#0040ff' }} icon={personCircle} />
						</IonCol>
					</IonRow>
					<form className="ion-padding">
						<IonItem>
							<IonLabel position="floating">Email</IonLabel>
							<IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Password</IonLabel>
							<IonInput
								type="password"
								value={password}
								onIonChange={(e) => setPassword(e.detail.value!)}
							/>
						</IonItem>
						<IonRow>
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
						</IonRow>
						<IonButton className="ion-margin-top" onClick={handleLogin} expand="block">
							Login
						</IonButton>
					</form>
					<IonRow>
						<IonCol>
							<p style={{ fontSize: 'medium', textAlign: 'center' }}>
								Don't have an account? <a href="/signup">Sign up!</a>
							</p>
						</IonCol>
					</IonRow>
				</IonContent>
				<IonFooter>
					<IonToolbar color="dark">
						<p style={{ fontSize: 'medium', textAlign: 'center' }}>Gainvest Holdings LLC</p>
					</IonToolbar>
				</IonFooter>
			</IonPage>
		</IonApp>
	);
};

export default Portal;
