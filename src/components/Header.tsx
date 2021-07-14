import {
	IonHeader,
	IonToolbar,
	IonTitle,
    IonCol,
    IonIcon
} from '@ionic/react';
import React from 'react';
import { useAuth0 } from "@auth0/auth0-react";
import { notificationsOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';

export const Header = () => {
    const { logout } = useAuth0();
    const history = useHistory();
	return (
        <IonHeader>
            <IonToolbar class="header dark">
                <div style={{display:"inline-block", textAlign: "left", width: "48%"}}>
                    <img alt="logo" height="40" src="https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png" />
                </div>
                <div style={{display:"inline-block", textAlign: "right", width: "48%"}}>
                    <div>
                        
                            
                        <IonIcon onClick={() => {
                            history.push({
                                pathname: '/notifications'
                            });
                        }} style={{ fontSize: '30px', marginRight:'20px', width: '50px' }} icon={notificationsOutline} />
                            
                        
                        <a style={{color: "#d7d7d7", textDecoration: "none", position: 'relative', top: '-10px'}} onClick={() => logout({ returnTo: window.location.origin})}>Logout</a>
                    </div>
                </div>
            </IonToolbar>
        </IonHeader>
	);
};
