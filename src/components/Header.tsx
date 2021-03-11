import {
	IonHeader,
	IonToolbar,
	IonTitle
} from '@ionic/react';
import React from 'react';

export const Header = () => {
	return (
        <IonHeader>
            <IonToolbar class="header light">
                <img alt="logo" height="40" src="https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png" />
            </IonToolbar>
        </IonHeader>
	);
};
