import {
	IonBadge,
	IonFooter,
	IonIcon,
	IonLabel,
	IonRouterOutlet,
	IonTabBar,
	IonTabButton,
	IonTabs
} from '@ionic/react';
import { chatboxEllipsesSharp, menuSharp, homeSharp } from 'ionicons/icons';
import React from 'react';
import { Route, Redirect } from 'react-router';
// import Dashboard from '../pages/Dashboard';
import Chat from '../pages/Chat';

export const Footer = () => {
	return (
		<IonTabs>
			<IonRouterOutlet>
				{/* <Route path="/dashboard" component={Dashboard} exact={true} /> */}
				<Route path="/chat" component={Chat} exact={true} />
				<Route path="/details" component={Chat} />
			</IonRouterOutlet>
			<IonTabBar slot="bottom">
				<IonTabButton tab="dashboard" href="/dashboard">
					<IonIcon icon={homeSharp} />
					<IonLabel>Home</IonLabel>
				</IonTabButton>
				<IonTabButton tab="chat" href="/chat">
					<IonIcon icon={chatboxEllipsesSharp} />
					<IonLabel>Chat</IonLabel>
				</IonTabButton>
				<IonTabButton tab="" href="/details">
					<IonIcon icon={menuSharp} />
					<IonLabel>Menu</IonLabel>
				</IonTabButton>
			</IonTabBar>
		</IonTabs>
	);
};
