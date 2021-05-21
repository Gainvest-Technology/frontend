import {
	IonContent,
	IonPage,
	IonItem,
	IonLabel,
	IonInput,
	IonButton,
	IonRow,
	IonCol,
	IonAlert,
	IonImg,
	IonFooter,
	IonToolbar,
	IonApp,
	IonGrid
} from '@ionic/react';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';

import '../assets/gainvest.css';

const Welcome: React.FC = () => {
	return (
		<IonPage>
			<IonContent>
				<div className="backy" style={{ height: '100%', width: '100%', background: '#152238' }}>
					<IonRow>
						<IonCol class="logo-container">
							<IonImg
								class="logo"
								src="https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png"
							/>
						</IonCol>
					</IonRow>
					<IonGrid>
						<div style={{ margin: 'auto 0', paddingTop: '20%' }}>
							<IonRow>
								<IonCol>
									<p
										style={{
											textAlign: 'center',
											fontSize: '40px',
											paddingTop: '30px',
											color: '#999'
										}}
									>
										Welcome to Gainvest
									</p>
								</IonCol>
							</IonRow>
							<IonRow>
								<IonCol>
									<a href="/questions">
										<IonButton
											className="ion-margin-top"
											expand="block"
											style={{ width: '30%', margin: '0 auto', color: '#fff' }}
										>
											Get Started
										</IonButton>
									</a>
									<p
										style={{
											fontSize: 'medium',
											textAlign: 'center',
											color: '#999',
											marginTop: '30px'
										}}
									>
										Have an account already? <a href="/portal">Sign In</a>
									</p>
								</IonCol>
							</IonRow>
						</div>
					</IonGrid>
				</div>
			</IonContent>
			<IonFooter>
				<IonToolbar color="dark">
					<p style={{ fontSize: 'medium', textAlign: 'center', paddingBottom: '0px' }}>
						&copy; 2021 Gainvest Holdings LLC All rights reserved.
					</p>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default Welcome;
