import {
    IonFooter,
} from '@ionic/react';
import React from 'react';


const d = new Date();

export const Footer = () => {
	return (
            <IonFooter>
                <p style={{textAlign: 'center', fontSize: 'smaller'}}>
                    Copyright © {d.getFullYear()} . All Rights Reserved. Gainvest Inc.
                </p>
            </IonFooter>
	);
};
