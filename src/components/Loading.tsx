import { IonSpinner, IonContent } from '@ionic/react';

import '../assets/gainvest.css';

import React from 'react';

export const Loading: React.FC = () => {
	return (
		<IonContent className="content">
			<IonSpinner name="crescent" className="loader" />
		</IonContent>
	);
};

export default Loading;