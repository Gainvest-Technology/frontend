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
	IonApp
} from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';

import { NavButtons } from '../components/NavButtons';

const Portal: React.FC = () => {
	const [ email, setEmail ] = useState<string>();
	const [ password, setPassword ] = useState<string>();

	const handleLogin = async () => {
		console.log('Email: ' + email);
		console.log('Password: ' + password);

		/*try {
			await Auth.signIn(email, password);
			userHasAuthenticated(true);
			//history.push('/');
		} catch (e) {
			alert(e.message);
		}*/
	};
	return (
		<IonApp>
			<IonPage>
				<IonHeader>
					<IonToolbar color="dark">
						<IonTitle>Portal</IonTitle>
						<IonButtons slot="end">
							<NavButtons />
						</IonButtons>
					</IonToolbar>
				</IonHeader>
				<IonContent fullscreen>
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
						<IonButton className="ion-margin-top" type="submit" onClick={handleLogin} expand="block">
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
