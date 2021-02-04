import React, { useState, useEffect } from 'react';
import { Chat, Channel, Window } from 'stream-chat-react';
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
	IonApp
} from '@ionic/react';
require('dotenv').config();

import 'stream-chat-react/dist/css/index.css';

const GainvestChat = (props: any) => {
	const [ chatClient, setChatClient ] = useState<StreamChat>(new StreamChat(process.env.CHAT_API_KEY || ''));
	const [ channel, setChannel ] = useState<any>(undefined);

	useEffect(() => {
		if (props.location.state) {
			const name = props.location.state.data.name;
			const id = props.location.state.data.id;
			const token = props.location.state.data.token;

			chatClient.connectUser(
				{
					id: id,
					name: name,
					image: 'https://getstream.io/random_svg/?name=John',
				},
				token
			);
				
			const channel = chatClient.channel('messaging', 'GainvestChatPreview', {
				// add as many custom fields as you'd like
				name: 'How Can Gainvest Improve Your Net Worth',
			});
			

			setChannel(channel);

			channel.watch();
		}
	},[props]);  
	
	return(
		<IonApp>
			<IonPage>
				<IonHeader>
					<IonToolbar color="dark">
						<IonTitle>Gainvest Social</IonTitle>
					</IonToolbar>
				</IonHeader>
				<IonContent fullscreen>
					<Chat client={chatClient} theme={'messaging light'}>
						<Channel channel={channel}>
							<ChannelHeader />
							<Window>
							<MessageList />
							<MessageInput />
							</Window>
							<Thread />
						</Channel>
					</Chat>
				</IonContent>
				<IonFooter>
					<IonToolbar color="dark">
						<p style={{ fontSize: 'medium', textAlign: 'center' }}>Gainvest LLC</p>
					</IonToolbar>
				</IonFooter>
			</IonPage>
		</IonApp>
	)
}

export default GainvestChat; 