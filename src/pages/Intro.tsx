import React, { useEffect, useState, } from 'react';
import {
	IonApp,
	IonButtons,
	IonContent,
	IonRow,
	IonCol,
	IonAlert,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonItem,
	IonLabel,
	IonInput,
	IonFooter,
	IonIcon
} from '@ionic/react';
import { useHistory } from 'react-router';

const Intro: React.FC = (props: any) => {
	const history = useHistory();
	const [ firstName, setFirstName ] = useState<string>();
	const [ lastName, setLastName ] = useState<string>();
	const [ email, setEmail ] = useState<string>();
	const [ password, setPassword ] = useState<string>();
	const [ confirmPassword, setConfirmPassword ] = useState<string>();
	const [ iserror, setIserror ] = useState<boolean>(false);
	const [ accountCreated, setAccountCreated ] = useState<boolean>(false);
	const [ message, setMessage ] = useState<string>('');
	const [ userData, setUserData ] = useState<any>({});

	useEffect(() => {
		if (props.location.state) {
			setUserData({
				token: props.location.state.data.token,
				chatToken: props.location.state.data.chatToken,
				firstName: props.location.state.data.firstName,
				lastName: props.location.state.data.lastName,
				email: props.location.state.data.email,
				id: props.location.state.data.id,
				chatApiKey: props.location.state.data.chatApiKey,
				chatId: props.location.state.data.chatId
			});
		}
	},[props])

    function goHome() {
        history.push({
            pathname: '/dashboard',
			state: {
				data: userData
			}
        });
    }

	return (

			<IonPage>
				<IonContent fullscreen>
                    <video id="myVideo" width="100%" height="100%" autoPlay onEnded={goHome}>
                        <source src="https://gainvestco.s3.us-east-2.amazonaws.com/IntroGainvest.m4v" type="video/mp4"></source>
                        Your browser does not support HTML5 video.
                    </video>
				</IonContent>
			</IonPage>

	);
};

export default Intro;
