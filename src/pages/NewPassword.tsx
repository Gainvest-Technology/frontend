import React, { useState } from 'react';
import {
	IonContent,
	IonRow,
	IonCol,
	IonAlert,
	IonPage,
	IonButton,
	IonItem,
	IonLabel,
	IonInput,
	IonFooter,
	IonImg
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const NewPassword: React.FC = (props: any) => {
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

	const handleUpdate = async (event: { preventDefault: () => void }) => {
		if (!password) {
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
			email: props.location.state.data.email,
			password: password,
		};

		const api = axios.create({
			//baseURL: 'http://localhost:3000/'
			baseURL: 'https://gainvest-api.com'
		});

		api
			.post('/users/update_password', signUpData)
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
				})
				setMessage('Password Changed Successfully');
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
							<IonImg class="logo" src='https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png' />
						</IonCol>
					</IonRow>
					<form className="ion-padding form">
                        <h2 style={{ color: '#212326', textAlign: 'center' }}>Welcome Back!</h2>
                        <p style={{ color: '#212326', textAlign: 'center' }}>Please Confirm Your Password For The New Gainvest Experience </p>
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
						<IonButton className="ion-margin-top" onClick={handleUpdate} expand="block">
							Update
						</IonButton>
					</form>
					<IonRow>
						<IonCol>
							<p style={{ fontSize: 'medium', textAlign: 'center' }}>
								Already have an account? <a href="/">Sign In!</a>
							</p>
						</IonCol>
					</IonRow>
				</IonContent>
				<IonFooter>
					{/* <IonToolbar color="dark">
						<p style={{ fontSize: 'medium', textAlign: 'center' }}>Gainvest Holdings LLC</p>
					</IonToolbar> */}
				</IonFooter>
			</IonPage>
	);
};

export default NewPassword;


