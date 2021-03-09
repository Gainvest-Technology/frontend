import React, { useState, useEffect, useContext } from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonFooter,
	IonApp,
	// IonSlides,
	// IonSlide,
	IonButton,
	IonRow,
	IonCol,
	IonIcon,
	IonLabel
} from '@ionic/react';
import 'stream-chat-react/dist/css/index.css';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';
import { Header }  from '../components/Header';
import { businessSharp, chatboxEllipsesSharp, documentsSharp, homeSharp } from 'ionicons/icons';

const GainvestChat = (props: any) => {
	const [ chatStyle, setChatStyle ] = useState<string>('messaging light');
	const [ channel, setChannel ] = useState<any>(undefined);
	const [ theme, setTheme ] = useState<string>('dark');
	const [ chat, setChat ] = useState<any>(false);
	const [ channelList, setChannelList ] = useState<any>(undefined);
	const [ filter, setFilter ] = useState<any>(undefined);
	const [ sort, setSort ] = useState<any>(undefined);
	const [ chatComponent, setChatComponent ] = useState<any>('');
	const [ userData, setUserData ] = useState<any>();
	const history = useHistory();

	// const slideOpts = {
	// 	initialSlide: 0,
	// 	speed: 400
	//   };

	const user = useContext(UserContext);

	useEffect(() => {
		if (props.location.state) {

			// if (!props.location.state.data.id) {
			// 	history.push({pathname: '/login'});
			// }

			const firstName = props.location.state.data.firstName;
			const lastName = props.location.state.data.lastName;
            const name = firstName + ' ' + lastName;

			const chatId = props.location.state.data.chatId;
			const token = props.location.state.data.chatToken;
			const chatApiKey = props.location.state.data.chatApiKey;

			setUserData({
                token: props.location.state.data.token,
                chatToken: props.location.state.data.chatToken,
                firstName: props.location.state.data.firstName,
                lastName: props.location.state.data.lastName,
                email: props.location.state.data.email,
                id: props.location.state.data.id,
                chatApiKey: props.location.state.data.chatApiKey,
                chatId: props.location.state.data.chatId
            })

			const chatClient = new StreamChat(chatApiKey);

			chatClient.connectUser(
				{
					id: chatId,
					name: firstName + ' ' + lastName,
					image: 'https://getstream.io/random_svg/?name=' + firstName
				},
				token
			);
				
			// const channel = chatClient.channel('messaging', 'General', {
			// 	// add as many custom fields as you'd like
			// 	name: 'General Public Chat',
			// });

			

			const chatChannel = chatClient.channel('messaging', 'GainvestChatPreview', {
				// add as many custom fields as you'd like
				name: 'Investors - General',
			});

			chatChannel.watch().then(() => {
				setChannel(chatChannel);

				setFilter({ type: 'messaging' });
				setSort({ last_updated: -1 });
				setChannelList(chatClient.queryChannels(filter));

				setChatComponent(
					<Chat client={chatClient} theme={chatStyle}>
						<ChannelList filters={filter} sort={sort} />
						<Channel channel={channel}>
							<Window>
							<ChannelHeader />
							<MessageList />
							<MessageInput />
							</Window>
							<Thread />
						</Channel>
					</Chat>
				);
			});

		}
	},[props]);  

	function navigate(route: string) {
        history.push({
            pathname: route,
            state: {
                data: userData
            }
        });
    }

	// function accredited() {
	// 	if (props.location.state) {
	// 		const name = props.location.state.data.name;
	// 		const id = props.location.state.data.id;
	// 		const token = props.location.state.data.token;

	// 		chatClient.connectUser(
	// 			{
	// 				id: id,
	// 				name: name,
	// 				image: 'https://getstream.io/random_svg/?name=John',
	// 			},
	// 			token
	// 		);
				
	// 		const channel = chatClient.channel('messaging', 'GainvestChatAccredited', {
	// 			// add as many custom fields as you'd like
	// 			name: 'Experienced Investors - General',
	// 		});
			

	// 		setChannel(channel);

	// 		channel.watch();

	// 		setChat(true);
	// 	}
	// }

	// function normal() {
	// 	if (props.location.state) {
	// 		const name = props.location.state.data.name;
	// 		const id = props.location.state.data.id;
	// 		const token = props.location.state.data.token;

	// 		chatClient.connectUser(
	// 			{
	// 				id: id,
	// 				name: name
	// 			},
	// 			token
	// 		);
				
	// 		const channel = chatClient.channel('messaging', 'GainvestChatPreview', {
	// 			// add as many custom fields as you'd like
	// 			name: 'Investors - General',
	// 		});
			

	// 		setChannel(channel);

	// 		channel.watch();

	// 		setChat(true);
	// 	}
	// }

	// function changeTheme() {
	// 	if (theme === 'light') {
	// 		setChatStyle('messaging dark');
	// 		setTheme('dark');
	// 	}
	// 	else {
	// 		setChatStyle('messaging light');
	// 		setTheme('light');
	// 	}
	// }
	
	return(
		<IonApp>
			<IonPage>
				<IonContent>
					<Header/>
					{/* {!chat && 
						<IonSlides style={{ height: '100%', backgroundColor: '#0b0d70', color: '#ededed	'}} pager={true} options={slideOpts}>
							<IonSlide style={{ display: 'block', marginTop: '120px'}}>
								<h1>Welcome To Gainvest Social</h1>
								<p>This is where people connect and talk all things Gainvest. Get advice, ask questions, and share legal knowledge with your fellow comrades!</p>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '120px', padding: '10px'}}>
								<h1>Are You An Accredited Investor?</h1>
								<p>
									<IonButton onClick={accredited} expand="block">
										Yes	
									</IonButton>
									<IonButton onClick={normal} expand="block">
										No
									</IonButton>
								</p>
							</IonSlide>
						</IonSlides>
					}
					{chat &&  */}
						{/* <Chat client={chatClient} theme={chatStyle}>
							<ChannelList filters={filter} sort={sort} />
							<Channel channel={channel}>
								<Window>
								<ChannelHeader />
								<MessageList />
								<MessageInput />
								</Window>
								<Thread />
							</Channel>
						</Chat> */}

						{ chatComponent }
					{/* } */}
				</IonContent>
				<IonToolbar slot="bottom" className="menu-tabs" >
                        <IonRow>
                            <IonCol onClick={() => { navigate('/dashboard') }}>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <IonIcon style={{ flex: '1'}} icon={homeSharp} />
                                </div>
                                <IonLabel style={{ display: 'block', textAlign: 'center', fontSize:'11px'}}>Home</IonLabel>                                    
                            </IonCol>
                            <IonCol onClick={() => { navigate('/chat') }}>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <IonIcon style={{ flex: '1'}} icon={chatboxEllipsesSharp} />
                                </div>
                                <IonLabel style={{ display: 'block', textAlign: 'center', fontSize:'11px'}}>Chat</IonLabel>
                            </IonCol>
                            <IonCol onClick={() => { navigate('/documents') }}>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <IonIcon style={{ flex: '1'}} icon={documentsSharp} />
                                </div>
                                <IonLabel style={{ display: 'block', textAlign: 'center', fontSize:'11px'}}>Portfolio</IonLabel>
                            </IonCol>
                            <IonCol onClick={() => { navigate('/funds') }}>
                                <div style={{ display: 'flex', alignItems: 'center'}}>
                                    <IonIcon style={{ flex: '1'}} icon={businessSharp} />
                                </div>
                                <IonLabel style={{ display: 'block', textAlign: 'center', fontSize:'11px'}}>Funds</IonLabel>
                            </IonCol>
                        </IonRow>
                    </IonToolbar>
				{/* <IonFooter>
					<IonToolbar color="dark">
						<p style={{ fontSize: 'medium', textAlign: 'right' }}>
							<IonButton color="light" onClick={changeTheme}>Current Theme: {theme}</IonButton>
						</p>
						<p style={{ fontSize: 'small', textAlign: 'center' }}>Gainvest Holdings LLC</p>
					</IonToolbar>
				</IonFooter> */}
			</IonPage>
		</IonApp>
	)
}

export default GainvestChat; 