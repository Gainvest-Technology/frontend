import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Channel, ChannelList, Window, useChatContext } from "stream-chat-react";
import { ChannelHeader, MessageList } from "stream-chat-react";
import { MessageInput, Thread } from "stream-chat-react";
import { IonContent, IonPage, useIonViewDidEnter, useIonViewWillEnter } from "@ionic/react";
import "stream-chat-react/dist/css/index.css";
import { Header } from "../components/Header";
import { useAuth0 } from "@auth0/auth0-react";
import { FooterNav } from "../components/FooterNav";
import Api from "../utils/axios";
import chatClient from "../utils/getStream";
import Loading from "../components/Loading";

const ChannelOpener = ({ openChannelList, setShowloading, isFirstLoad, showLoading }: any) => {
    useEffect(() => {
        if (isFirstLoad.current ) {
            openChannelList();
            isFirstLoad.current = false;
            setTimeout(() => {
                setShowloading(false);
            }, 300); // need to hide while animating
        }
    }, []);
    return null;
};

const GainvestChannelList: React.FC = (props: any) => {
    const isFirstLoad = useRef(true);
    const history = useHistory();
    const { user, isAuthenticated, isLoading } = useAuth0();
    const { openMobileNav } = useChatContext();

    const [userDetail, setUserDetail] = useState<{ token: string; nickname: string }>();
    const [chatReady, setChatReady] = useState(false);
    const [showLoading, setShowloading] = useState(true);

    useIonViewWillEnter(() => {
        setShowloading(true);
    });

    useIonViewDidEnter(() => {
        // used if chat already opened before, 
        if (!isFirstLoad.current) {
            if (openMobileNav) openMobileNav();
            setTimeout(() => {
                setShowloading(false);
            }, 300); // need to hide while animating
        }
        
    });

    const getUserDetail = async () => {
        if (user) {
            const { data: userDetailResult } = await Api.get(`/users/${user.email}`);
            setUserDetail(userDetailResult);
        }
    };

    const connectChat = () => {
        if (userDetail) {
            chatClient.connectUser(
                {
                    id: "Test22Tester",
                    name: "Test22 Tester",
                    image: "https://getstream.io/random_svg/?name=" + userDetail.nickname,
                },
                userDetail.token
            );
            setChatReady(true);
        }
    };

    const isAccessible = () => {
        if (!isLoading && !isAuthenticated) {
            // TODO: go to login?
            history.push({ pathname: "/" });
        }
    };

    useEffect(() => {
        if (userDetail) connectChat();
    }, [userDetail]);

    useEffect(() => {
        getUserDetail();
    }, [user]);

    useEffect(() => {
        isAccessible();
    }, [isLoading, isAuthenticated]);

    return (
        <IonPage>
            <IonContent>
                <Header />

                {chatReady && (
                    <>
                        <ChannelList showChannelSearch filters={{ type: "messaging" }} />
                        <Channel>
                            <Window>
                                <ChannelHeader />
                                <MessageList />
                                <MessageInput />
                            </Window>
                            <Thread />
                            <ChannelOpener
                                isFirstLoad={isFirstLoad}
                                setShowloading={setShowloading}
                                openChannelList={openMobileNav}
                                showLoading={showLoading}
                            />
                        </Channel>
                    </>
                )}
                {showLoading && (
                    <div className="full-page-loading">
                        <Loading />
                    </div>
                )}
            </IonContent>
            <FooterNav />
        </IonPage>
    );
};

export default GainvestChannelList;
