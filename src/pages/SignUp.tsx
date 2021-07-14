import React, { useState } from 'react';
import {
	IonContent,
	IonRow,
	IonCol,
	IonAlert,
	IonPage,
	IonToolbar,
	IonButton,
	IonItem,
	IonLabel,
	IonInput,
	IonFooter,
	IonImg
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { Footer } from '../components/Footer';

const SignUp: React.FC = () => {
	const history = useHistory();
	const [ firstName, setFirstName ] = useState<string>();
	const [ lastName, setLastName ] = useState<string>();
	const [ email, setEmail ] = useState<string>();
	const [ password, setPassword ] = useState<string>();
	const [ confirmPassword, setConfirmPassword ] = useState<string>();
	const [ iserror, setIserror ] = useState<boolean>(false);
	const [ accountCreated, setAccountCreated ] = useState<boolean>(false);
	const [ message, setMessage ] = useState<string>('');
	const [ userData, setUserData ] = useState<any>({});

	function validateEmail(email: string) {
		const regexp = new RegExp(
			/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
		);
		return regexp.test(String(email).toLowerCase());
	}

	const handleRegister = async (event: { preventDefault: () => void }) => {
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

		if (password !== confirmPassword) {
			setMessage('Passwords Do Not Match');
			setIserror(true);
			return;
		}

		const signUpData = {
			first_name: firstName,
			last_name: lastName,
			email: email,
			password: password
		};

		const api = axios.create({
			//baseURL: 'http://localhost:3000/'
			baseURL: process.env.REACT_APP_GAINVEST_API
		});

		api
			.post('/signup', signUpData)
			.then((response) => {
				setUserData({
					token: response.data.token,
					chatToken: response.data.chatToken,
					firstName: response.data.firstName,
					lastName: response.data.lastName,
					email: response.data.email,
					id: response.data.id,
					chatApiKey: response.data.chatApiKey,
					chatId: response.data.chatId
				});
				setMessage('Account Created Successfully');
				setAccountCreated(true);
			})
			.catch((error) => {
				setMessage(error);
				setIserror(true);
			});
	};

	function goToIntro(): void {
		history.push({
			pathname: '/intro',
			state: {
				data: userData
			}
		});
	}

	return (
		<IonPage>
			<IonContent class="space-bg" fullscreen>
				<div className="backy" style={{ height: '100%', width: '100%', background: '#213861' }}>
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
							<IonAlert
								isOpen={accountCreated}
								onDidDismiss={() => goToIntro()}
								cssClass="my-custom-class"
								header={'Success!'}
								message={message}
								buttons={[ 'Ok' ]}
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
					<IonRow>
						<h3 style={{textAlign:'center', width:'100%'}}>First, Let's create your Account</h3>		
					</IonRow>
					<IonRow>
						<IonItem class="login-input">
							<IonLabel position="floating">First Name</IonLabel>
							<IonInput
								type="text"
								value={firstName}
								onIonChange={(e) => setFirstName(e.detail.value!)}
							/>
						</IonItem>
						<IonItem class="login-input">
							<IonLabel position="floating">Last Name</IonLabel>
							<IonInput type="text" value={lastName} onIonChange={(e) => setLastName(e.detail.value!)} />
						</IonItem>
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
								id="password"
							/>
						</IonItem>
						<IonItem class="login-input">
							<IonLabel position="floating">Confirm Password</IonLabel>
							<IonInput
								type="password"
								value={confirmPassword}
								onIonChange={(e) => setConfirmPassword(e.detail.value!)}
								id="confirm"
							/>
						</IonItem>
					</IonRow>
					<div style={{textAlign: 'center'}}>
						<IonButton style={{maxWidth: '40%', margin:'20px auto'}} className="ion-margin-top" onClick={handleRegister} expand="block">
							Register
						</IonButton>
					</div>
					<IonRow>
						<IonCol>
							<p style={{ fontSize: 'medium', textAlign: 'center', color: '#d7d7d7' }}>
								Already have an account? <a href="/welcome">Sign In!</a>
							</p>
						</IonCol>
					</IonRow>
				</div>
			</IonContent>
			<Footer />
		</IonPage>
	);
};

export default SignUp;
