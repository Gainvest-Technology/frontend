import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonFooter } from '@ionic/react';
import React from 'react';
import './Home.css';
import { NavButtons } from '../components/NavButtons';

const GainVest: React.FC = () => {
	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color="dark">
					<IonTitle>Gainvest 101</IonTitle>
					<IonButtons slot="end">
						<NavButtons />
					</IonButtons>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen />
			<IonFooter>
				<IonToolbar color="dark">
					<p style={{ fontSize: 'medium', textAlign: 'center' }}>Gainvest Holdings LLC</p>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default GainVest;
