import React, { useState, useEffect, useContext } from 'react';
import { Chat, Channel, ChannelList, Window } from 'stream-chat-react';
import { ChannelHeader, MessageList } from 'stream-chat-react';
import { MessageInput, Thread } from 'stream-chat-react';
import { StreamChat } from 'stream-chat';
import {
	IonContent,
	IonPage
} from '@ionic/react';
import 'stream-chat-react/dist/css/index.css';
import { Header }  from '../components/Header';
import { useAuth0 } from "@auth0/auth0-react";
import axios from 'axios';
import { FooterNav } from '../components/FooterNav';

const GainvestChat: React.FC = (props: any) => {
	const [ chatStyle, setChatStyle ] = useState<string>('messaging light');
	const [ chatComponent, setChatComponent ] = useState<any>();
	const filters = { type: 'messaging' };
	const { user, isAuthenticated, isLoading } = useAuth0();

	useEffect(() => {
		if (user) {
			const api = axios.create({
				baseURL: process.env.REACT_APP_GAINVEST_API
				//baseURL: 'http://localhost:3000'
			});

			api.get(`/users/${user.email}`).then(async (response) => {
				const current_user = response.data;
                const token = current_user.token;
				const chatApiKey = process.env.REACT_APP_STREAM_API_KEY || '';

				const chatClient = StreamChat.getInstance(chatApiKey);

				await chatClient.connectUser(
					{
						id: 'Test22Tester',
						name: 'Test22 Tester',
						image: 'https://getstream.io/random_svg/?name=' + user.nickname
					},
					token
				);

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
			});
		}
	},[user]);

		
	return(
			<IonPage>
				<IonContent>
					<Header/>
					{chatComponent}
				</IonContent>
				<FooterNav />
			</IonPage>
	)
}

export default GainvestChat; 