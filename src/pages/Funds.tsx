import {
	IonContent,
	IonPage,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonApp,
    IonAvatar,
    IonTabBar,
    IonTab,
    IonTabButton,
    IonLabel,
    IonTabs,
    IonCard,
    IonHeader,
    IonCardHeader,
    IonCardContent,
    IonFooter,
    IonToolbar
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { NavButtons } from '../components/NavButtons';
import { calendar, personCircle, map, informationCircle, logoUsd, businessSharp, peopleSharp, calendarSharp, homeSharp, chatboxEllipsesSharp, menuSharp, documentsSharp } from 'ionicons/icons';
import { Header }  from '../components/Header';
import { Footer }  from '../components/Footer';
import { StreamChat } from 'stream-chat';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { UserContext } from '../contexts/UserContext';

const Dashboard: React.FC = (props: any) => {
    const history = useHistory();
    const [ capital, setCapital ] = useState<number>(0.00);
    const [ fundCount, setFundCount ] = useState<number>(0);
    const [ investorName, setInvestorName ] = useState<string>('');
    const [ avatar, setAvatar ] = useState<string>('');
    const [ userData, setUserData ] = useState<any>({});
    const [ allFunds, setAllFunds ] = useState<any>();
 
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

            const api = axios.create({
                baseURL: 'https://gainvest-api.com'
                //baseURL: 'http://localhost:3000'
            });
            api.get(`/funds`).then((response) => {
                const data = response.data;

                function checkActive(fund: any) {
                    if (fund.status === 'Active' || fund.status === 'Open') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }

                const activeFunds = data.filter(checkActive);

                const funds = activeFunds.map((fund:any) => {
                    const fund_size = <IonCol><div style={{textDecoration: 'underline', marginBottom: '5px'}}>Total Fund Size</div><div style={{fontWeight: 'bold'}}>{fund.total_fund_size}</div></IonCol>;
                    const start_date = <IonCol><div style={{textDecoration: 'underline', marginBottom: '5px'}}>Start Date</div><div style={{fontWeight: 'bold'}}>{fund.start_date}</div></IonCol>;
                    const learn_more = <IonCol><a className="learn-more" href={fund.description}>Learn More</a></IonCol>;
                    const invest = <IonCol><a className="invest" href={fund.invest_rich}>Invest</a></IonCol>;
                    
                    const header = <IonRow style={{ width: '100%'}} className="fund-header"><IonCol>{fund.name}</IonCol></IonRow>;
                    const second_row = <IonRow style={{ width: '100%'}} className="fund-row">{start_date}{fund_size}</IonRow>;
                    const third_row = <IonRow style={{ width: '100%'}} className="fund-row">{learn_more}{invest}</IonRow>;

                    return(
                        <IonRow className="fund-container box-shadow">
                            {header}
                            {second_row}
                            {third_row}
                        </IonRow>
                    )
                });

                setAllFunds(
                    <IonGrid>
                        {funds}
                    </IonGrid>
                )               
            })
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

	return (
        <IonApp>
            <IonPage>
                <Header/>
                <IonContent className="light">
                    <h1 className="h1">Available Funds</h1>
                    {allFunds}
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
            </IonPage>
        </IonApp>
	);
};

export default Dashboard;
