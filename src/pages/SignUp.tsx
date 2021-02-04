import React, { useState } from 'react';
import {
	IonApp,
	IonButtons,
	IonContent,
	IonRow,
	IonCol,
	IonAlert,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonItem,
	IonLabel,
	IonInput,
	IonFooter,
	IonIcon
} from '@ionic/react';
import { NavButtons } from '../components/NavButtons';
import { personCircle } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

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
			password: password,
			//confirmPassword: confirmPassword
		};

		const api = axios.create({
			baseURL: 'http://localhost:3000/'
		});

		api
			.post('/signup', signUpData)
			.then((response) => {
				setMessage('Account Created Successfully');
				setAccountCreated(true);
			})
			.catch((error) => {
				setMessage(error);
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
							<IonAlert
								isOpen={accountCreated}
								onDidDismiss={() => history.push('/')}
								cssClass="my-custom-class"
								header={'Success!'}
								message={message}
								buttons={[ 'Ok' ]}
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
							<IonLabel position="floating">First Name</IonLabel>
							<IonInput
								type="text"
								value={firstName}
								onIonChange={(e) => setFirstName(e.detail.value!)}
							/>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Last Name</IonLabel>
							<IonInput type="text" value={lastName} onIonChange={(e) => setLastName(e.detail.value!)} />
						</IonItem>
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
								id="password"
							/>
						</IonItem>
						<IonItem>
							<IonLabel position="floating">Confirm Password</IonLabel>
							<IonInput
								type="password"
								value={confirmPassword}
								onIonChange={(e) => setConfirmPassword(e.detail.value!)}
								id="confirm"
							/>
						</IonItem>
						<IonButton className="ion-margin-top" onClick={handleRegister} expand="block">
							Register
						</IonButton>
					</form>
					<IonRow>
						<IonCol>
							<p style={{ fontSize: 'medium', textAlign: 'center' }}>
								Already have an account? <a href="/portal">Sign In!</a>
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

export default SignUp;
