import {
    IonCol,
    IonFooter, IonIcon, IonLabel, IonRow, IonToolbar,
} from '@ionic/react';
import { personCircleOutline, appsOutline, documentOutline, planetOutline, chatbubbleEllipsesOutline, newspaperOutline } from 'ionicons/icons';
import React from 'react';
import { useHistory } from 'react-router-dom';

const navObject = {
    home: '/dashboard',
    data_room: '/documents',
    marketplace: '/funds',
    chat: '/chat',
    feed: '/feed',
    notifications: '/notifications',
    profile: '/profile'
}


export const FooterNav = () => {
    const history = useHistory();
	return (
        <IonToolbar slot="bottom" className="menu-tabs" style={{ paddingBottom: '20px' }}>
            <IonRow>
                <IonCol
                    className="nav-toolbar-item"
                    onClick={() => {
                        history.push({
                            pathname: navObject.marketplace
                        });
                    }}
                >
                    <div className="chat" style={{ display: 'flex', alignItems: 'center' }}>
                        <IonIcon style={{ flex: '1', fontSize: '30px' }} icon={planetOutline} />
                    </div>
                </IonCol>
                <IonCol
                    className="nav-toolbar-item"
                    onClick={() => {
                        history.push({
                            pathname: navObject.home
                        });
                    }}
                >
                    <div className="funds" style={{ display: 'flex', alignItems: 'center', color: '#ffffff' }}>
                        <IonIcon style={{ flex: '1', fontSize: '30px' }} icon={personCircleOutline} />
                    </div>
                </IonCol>
                <IonCol
                    className="nav-toolbar-item"
                    onClick={() => {
                        history.push({
                            pathname: navObject.chat
                        });
                    }}
                >
                    <div className="portfolio" style={{ display: 'flex', alignItems: 'center' }}>
                        <IonIcon style={{ flex: '1', fontSize: '30px' }} icon={chatbubbleEllipsesOutline} />
                    </div>
                </IonCol>
                <IonCol
                    className="nav-toolbar-item"
                    onClick={() => {
                        history.push({
                            pathname: navObject.data_room
                        });
                    }}
                >
                    <div className="portfolio" style={{ display: 'flex', alignItems: 'center' }}>
                        <IonIcon style={{ flex: '1', fontSize: '30px' }} icon={documentOutline} />
                    </div>
                </IonCol>
                {/* <IonCol
                    className="nav-toolbar-item"
                    onClick={() => {
                        history.push({
                            pathname: navObject.feed
                        });
                    }}
                >
                    <div className="portfolio" style={{ display: 'flex', alignItems: 'center' }}>
                        <IonIcon style={{ flex: '1', fontSize: '30px' }} icon={newspaperOutline} />
                    </div>
                </IonCol> */}
            </IonRow>
        </IonToolbar>
	);
};
