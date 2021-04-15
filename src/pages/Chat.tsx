import React, { useState, useEffect, useContext } from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import {
	IonContent,
	IonPage,
	IonToolbar,
	IonRow,
	IonCol,
	IonIcon,
	IonLabel
} from '@ionic/react';
import 'stream-chat-react/dist/css/index.css';
import { useHistory } from 'react-router-dom';
import { Header }  from '../components/Header';
import { businessSharp, chatboxEllipsesSharp, documentsSharp, gridOutline, homeSharp } from 'ionicons/icons';
//import async from 'async';

const GainvestChat: React.FC = (props: any) => {
	const [ chatStyle, setChatStyle ] = useState<string>('messaging light');
	//const [ chatClient, setChatClient ] = useState<any>(StreamChat.getInstance('f59jfmz43xe6'));
	const [ chatComponent, setChatComponent ] = useState<any>();
	const history = useHistory();
	const filters = { type: 'messaging' };
	

	const [chatClient, setChatClient] = useState<any>();

	useEffect(() => {
		if (props.location.state) {

			const firstName = props.location.state.data.firstName;
			const lastName = props.location.state.data.lastName;
            const name = firstName + ' ' + lastName;

			const chatId = props.location.state.data.chatId;
			const token = props.location.state.data.chatToken;
			const chatApiKey = props.location.state.data.chatApiKey;

			const initChat = async () => {
				const chatClient = StreamChat.getInstance(chatApiKey);

				await chatClient.connectUser(
					{
						id: chatId,
						name: firstName + ' ' + lastName,
						image: 'https://getstream.io/random_svg/?name=' + firstName
					},
					token
				);

				//const chatChannel = chatClient.channel('messaging', 'GainvestChatPreview');
				

				// let channel = chatClient.channel('messaging', 'PublicGeneral', { 
				// 	name: 'General', 
				// 	created_by_id: 'clizzy12'
				// });
			  
				// channel.watch((state: any) => {
					
				// });

				// chatClient.channel('messaging', 'GainvestChatAccredited').watch().then(() => {
				// 	this.hide();
				// });

				// chatClient.channel('messaging', 'GainvestChatPreview').watch().then(() => {
				// 	this.hide();
				// });

				// await channel.hide();

				// channel = chatClient.channel('messaging', 'GainvestChatPreview');

				// await channel.hide();

				const chatComponent = <Chat client={chatClient} theme={chatStyle}>
	 					<ChannelList filters={filters}/>
	 					<Channel>
	 						<Window>
	 						<ChannelHeader />
	 						<MessageList />
	 						<MessageInput />
	 						</Window>
	 						<Thread />
						</Channel>
					</Chat>

	 			setChatComponent(chatComponent);

				//setChatClient(chatClient);
			};
			
			initChat();
		}
	},[props]);

	async function createPrivateChannel(){

	}


	

	// useEffect(() => {
	// 	if (props.location.state) {

	// 		// if (!props.location.state.data.id) {
	// 		// 	history.push({pathname: '/login'});
	// 		// }

	// 		const firstName = props.location.state.data.firstName;
	// 		const lastName = props.location.state.data.lastName;
    //         const name = firstName + ' ' + lastName;

	// 		const chatId = props.location.state.data.chatId;
	// 		const token = props.location.state.data.chatToken;
	// 		const chatApiKey = props.location.state.data.chatApiKey;

	// 		const chatClient = new StreamChat(chatApiKey);

	// 		chatClient.connectUser(
	// 			{
	// 				id: chatId,
	// 				name: firstName + ' ' + lastName,
	// 				image: 'https://getstream.io/random_svg/?name=' + firstName
	// 			},
	// 			token
	// 		);
				
	// 		// const channel = chatClient.channel('messaging', 'General', {
	// 		// 	// add as many custom fields as you'd like
	// 		// 	name: 'General Public Chat',
	// 		// });

			

	// 		const chatChannel = chatClient.channel('messaging', 'GainvestChatPreview', {
	// 			// add as many custom fields as you'd like
	// 			name: 'Investors - General',
	// 		});

	// 		chatChannel.watch().then(() => {
	// 			const chatComponent = <Chat client={chatClient} theme={chatStyle}>
	// 				<ChannelList/>
	// 					<Channel channel={chatChannel}>
	// 						<Window>
	// 						<ChannelHeader />
	// 						<MessageList />
	// 						<MessageInput />
	// 						</Window>
	// 						<Thread />
	// 				</Channel>
	// 			</Chat>

	// 			setChatComponent(chatComponent);
	// 		});

	// 	}
	// },[props]);  

	function navigate(route: string) {
        history.push({
            pathname: route,
            state: {
                data: {
                    token: props.location.state.data.token,
					chatToken: props.location.state.data.chatToken,
					firstName: props.location.state.data.firstName,
					lastName: props.location.state.data.lastName,
					email: props.location.state.data.email,
					id: props.location.state.data.id,
					chatApiKey: props.location.state.data.chatApiKey,
					chatId: props.location.state.data.chatId,
                }
            }
        });
    }

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
			<IonPage>
				<IonContent style={{ position: 'absolute'}}>
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
						{/* {pageData.chatComponent} */}
					{chatComponent}
				</IonContent>
				<IonToolbar slot="bottom" className="menu-tabs" style={{ position: 'fixed', bottom: '0' }} >
					<IonRow>
						<IonCol className="nav-toolbar-item" onClick={() => { navigate('/dashboard') }}>
							<div style={{ display: 'flex', alignItems: 'center'}}>
								<IonIcon style={{ flex: '1'}} icon={homeSharp} />
							</div>
							<IonLabel style={{ display: 'block', textAlign: 'center', fontSize:'11px'}}>Home</IonLabel>                                    
						</IonCol>
						<IonCol className="nav-toolbar-item" onClick={() => { navigate('/chat') }}>
							<div style={{ display: 'flex', alignItems: 'center'}}>
								<IonIcon style={{ flex: '1'}} icon={chatboxEllipsesSharp} />
							</div>
							<IonLabel style={{ display: 'block', textAlign: 'center', fontSize:'11px'}}>Chat</IonLabel>
						</IonCol>
						<IonCol className="nav-toolbar-item" onClick={() => { navigate('/documents') }}>
							<div style={{ display: 'flex', alignItems: 'center'}}>
								<IonIcon style={{ flex: '1'}} icon={documentsSharp} />
							</div>
							<IonLabel style={{ display: 'block', textAlign: 'center', fontSize:'11px'}}>Portfolio</IonLabel>
						</IonCol>
						<IonCol className="nav-toolbar-item" onClick={() => { navigate('/menu') }}>
							<div style={{ display: 'flex', alignItems: 'center'}}>
								<IonIcon style={{ flex: '1'}} icon={gridOutline} />
							</div>
							<IonLabel style={{ display: 'block', textAlign: 'center', fontSize:'11px'}}>Menu</IonLabel>
						</IonCol>
					</IonRow>
				</IonToolbar>
			</IonPage>
	)
}

export default GainvestChat; 