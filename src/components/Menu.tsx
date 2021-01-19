import {
	IonMenu,
	IonHeader,
	IonToolbar,
	IonTitle,
	IonContent,
	IonList,
	IonMenuToggle,
	IonItem,
	IonLabel
} from '@ionic/react';
import React from 'react';

export const Menu = () => {
	return (
		<IonMenu side="end" contentId="main">
			<IonHeader>
				<IonToolbar color="dark">
					<img alt="logo" height="40" src="img/gainvest_logo.png" />
					<IonTitle>Menu</IonTitle>
				</IonToolbar>
			</IonHeader>
			<IonContent>
				<IonList>
					<IonMenuToggle auto-hide="false" />
					<IonMenuToggle auto-hide="false">
						<IonItem button routerLink={'/portal'} routerDirection="none">
							<IonLabel>Portal</IonLabel>
						</IonItem>
					</IonMenuToggle>
				</IonList>
			</IonContent>
		</IonMenu>
	);
};
