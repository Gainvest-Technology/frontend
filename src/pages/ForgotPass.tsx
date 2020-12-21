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
	IonButton,
	IonFooter
} from '@ionic/react';
import React, { useState } from 'react';
import './Home.css';
import { NavButtons } from '../components/NavButtons';

const ForgotPassword: React.FC = () => {
	const [ email, setEmail ] = useState<string>();

	const handleLogin = () => {
		console.log('Email: ' + email);
	};
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color="dark">
					<IonTitle>Reset Password</IonTitle>
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
					<IonButton className="ion-margin-top" onClick={handleLogin} type="submit" expand="block">
						Reset
					</IonButton>
				</form>
			</IonContent>
			<IonFooter>
				<IonToolbar color="dark">
					<p style={{ fontSize: 'medium', textAlign: 'center' }}>Gainvest Holdings LLC</p>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default ForgotPassword;
