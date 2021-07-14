import React, { useState, useEffect, useContext } from 'react';
import {
    StreamApp,
    StatusUpdateForm,
    FlatFeed,
    NotificationDropdown,
    Activity,
    ActivityFooter,
    LikeButton,
    CommentField,
    CommentList,
    CommentItem,
    InfiniteScrollPaginator,
    UserBar,
    NotificationFeed,
  } from 'react-activity-feed';
import 'react-activity-feed/dist/index.css';
import {
	IonContent,
	IonPage,
	IonToolbar,
	IonRow,
	IonCol,
	IonIcon,
	IonLabel
} from '@ionic/react';
import { useHistory } from 'react-router-dom';
import { Header }  from '../components/Header';
import { businessSharp, chatboxEllipsesSharp, documentsSharp, gridOutline, homeSharp } from 'ionicons/icons';
//import async from 'async';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { FooterNav } from '../components/FooterNav';
import Loading from '../components/Loading';


const GainvestNotificationFeed: React.FC = (props: any) => {
	const [ chatStyle, setChatStyle ] = useState<string>('messaging light');
	//const [ chatClient, setChatClient ] = useState<any>(StreamChat.getInstance('f59jfmz43xe6'));
	const [ activityFeed, setActivityFeed ] = useState<any>();
	const history = useHistory();
    const { user, isAuthenticated, isLoading } = useAuth0();
	

	const [chatClient, setChatClient] = useState<any>();

	useEffect(() => {
		if (user) {
            const api = axios.create({
				baseURL: 'https://gainvest-api.com'
				//baseURL: 'http://localhost:3000'
			});

            api.get(`/users/${user.email}`).then((response) => {
				const current_user = response.data;
				const firstName = current_user.first_name;
                const lastName = current_user.last_name;
                const token = current_user.token;
                const chatApiKey = current_user.chatApiKey;
                const appId = current_user.appId;

                const activityFeed = <StreamApp apiKey={chatApiKey} appId={appId} token={token}>
                                        <div className="wrapper box">
                                            <h3 style={{marginLeft: '10px'}}>Notifications</h3>
                                        </div>
                                        <NotificationFeed 
                                            notify 
                                            feedGroup="Notification" 
                                        />
                                    </StreamApp>

                setActivityFeed(activityFeed);
			}).catch((error) => {});

		}
	},[user]);

    if (isLoading) {
		return (
			<IonPage>
				<Loading />
			</IonPage>
		);
	}
	
	return(
			<IonPage>
				<IonContent>
					<Header/>
					{activityFeed}
				</IonContent>
				<FooterNav/>
			</IonPage>
	)
}

export default GainvestNotificationFeed; 