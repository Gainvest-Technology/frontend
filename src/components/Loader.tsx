import { IonSpinner, IonContent } from '@ionic/react';

import '../assets/loader.css';

import React from 'react';

export const Loader: React.FC = () => {
	return (
		<IonContent className="content">
			<IonSpinner name="dots" className="loader" />
		</IonContent>
	);
};

export default Loader;
