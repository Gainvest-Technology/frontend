import {
	IonContent,
	IonPage,
    IonIcon,
    IonRow,
    IonCol,
    IonLabel,
    IonToolbar,
    IonItem,
    IonList
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Header }  from '../components/Header';
import { useHistory } from 'react-router-dom';
import { businessSharp, chatboxEllipsesSharp, documentsSharp, gridOutline, homeSharp } from 'ionicons/icons';

const Menu: React.FC = (props: any) => {
    const history = useHistory();
    const [ pageData, setPageData ] = useState<any>({
        token: '',
        chatToken: '',
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        chatApiKey: '',
        chatId: ''
    });
    
 
    useEffect(() => {
		if (props.location.state) {
            setPageData({
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
	},[props]);

    function navigate(route: string) {
        history.push({
            pathname: route,
            state: {
                data: {
                    token: pageData.token,
                    chatToken: pageData.chatToken,
                    firstName: pageData.firstName,
                    lastName: pageData.lastName,
                    email: pageData.email,
                    id: pageData.id,
                    chatApiKey: pageData.chatApiKey,
                    chatId: pageData.chatId
                }
            }
        });
    }

	return (
            <IonPage>
                <Header/>
                <IonContent className="light">
                    <IonList className="menu-page">
                        <IonItem button detail onClick={() => { navigate('/dashboard') }}>
                            <IonLabel>
                                Merch - (Coming Soon)
                            </IonLabel>
                        </IonItem>
                        <IonItem button detail onClick={() => { navigate('/dashboard') }}>
                            <IonLabel>
                                Schedule A Consult
                            </IonLabel>
                        </IonItem>
                        <IonItem button detail onClick={() => { navigate('/dashboard') }}>
                            <IonLabel>
                                Fundraising Package
                            </IonLabel>
                        </IonItem>
                        <IonItem button detail onClick={() => { navigate('/dashboard') }}>
                            <IonLabel>
                                Deal/Contract Review
                            </IonLabel>
                        </IonItem>
                        <IonItem button detail onClick={() => { navigate('/dashboard') }}>
                            <IonLabel>
                                Formation - Form LLC or Corporation
                            </IonLabel>
                        </IonItem>
                        <IonItem button detail onClick={() => { navigate('/dashboard') }}>
                            <IonLabel>
                                Contract Drafting
                            </IonLabel>
                        </IonItem>
                        <IonItem button detail onClick={() => { navigate('/funds') }}>
                            <IonLabel>
                                View All Funds
                            </IonLabel>
                        </IonItem>
                    </IonList>
                </IonContent>
                <IonToolbar slot="bottom" className="menu-tabs" >
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
	);
};

export default Menu;
