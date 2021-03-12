import {
	IonContent,
	IonPage,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonApp,
    IonLabel,
    IonToolbar
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { Header }  from '../components/Header';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { businessSharp, chatboxEllipsesSharp, documentsSharp, homeSharp } from 'ionicons/icons';

const Dashboard: React.FC = (props: any) => {
    const history = useHistory();
    // const [ capital, setCapital ] = useState<number>(0.00);
    // const [ fundCount, setFundCount ] = useState<number>(0);
    // const [ investorName, setInvestorName ] = useState<string>('');
    // const [ avatar, setAvatar ] = useState<string>('');
    // const [ userData, setUserData ] = useState<any>({});
    // const [ allFunds, setAllFunds ] = useState<any>();

    const [ pageData, setPageData ] = useState<any>({
        token: '',
        chatToken: '',
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        chatApiKey: '',
        chatId: '',
        activeFunds: []
    });
    
 
    useEffect(() => {
		if (props.location.state) {
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

                setPageData({
                    token: props.location.state.data.token,
                    chatToken: props.location.state.data.chatToken,
                    firstName: props.location.state.data.firstName,
                    lastName: props.location.state.data.lastName,
                    email: props.location.state.data.email,
                    id: props.location.state.data.id,
                    chatApiKey: props.location.state.data.chatApiKey,
                    chatId: props.location.state.data.chatId,
                    activeFunds: activeFunds
                })             
            })
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
                    <h1 className="h1">Available Funds</h1>
                    <IonGrid>
                        {
                            pageData.activeFunds.map((fund:any, index:any) => {
                                const key: any = fund.name + index; 
                                return (
                                    <IonRow key={"fund-container" + index} className="fund-container box-shadow">
                                        <IonRow key={"fund-header" + index} style={{ width: '100%'}} className="fund-header"><IonCol key={"innerCol" + index}>{fund.name}</IonCol></IonRow>
                                        <IonRow key={"1fund-row" + index} style={{ width: '100%'}} className="fund-row">
                                            <IonCol key={"startDateCol" + index}><div key={"1startDateDiv" + index} style={{textDecoration: 'underline', marginBottom: '5px'}}>Start Date</div><div key={"2startDateDiv" + index} style={{fontWeight: 'bold'}}>{fund.start_date}</div></IonCol>
                                            <IonCol key={"fundSizeCol" + index}><div key={"1fundSizeDiv" + index} style={{textDecoration: 'underline', marginBottom: '5px'}}>Total Fund Size</div><div key={"2fundSizeDiv" + index} style={{fontWeight: 'bold'}}>{fund.total_fund_size}</div></IonCol>;
                                        </IonRow>
                                        <IonRow key={"2fund-row" + index} style={{ width: '100%'}} className="fund-row">
                                            <IonCol key={"learnMoreCol" + index}><a key={"learnMoreAnc" + index} className="learn-more" href={fund.description}>Learn More</a></IonCol>
                                            <IonCol  key={"investCol" + index}><a key={"investAnc" + index} className="invest" href={fund.invest_rich}>Invest</a></IonCol>
                                        </IonRow>
                                    </IonRow>
                                )
                            })
                        }
                    </IonGrid>
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
                        <IonCol className="nav-toolbar-item" onClick={() => { navigate('/funds') }}>
                            <div style={{ display: 'flex', alignItems: 'center'}}>
                                <IonIcon style={{ flex: '1'}} icon={businessSharp} />
                            </div>
                            <IonLabel style={{ display: 'block', textAlign: 'center', fontSize:'11px'}}>Funds</IonLabel>
                        </IonCol>
                    </IonRow>
                </IonToolbar>
            </IonPage>
	);
};

export default Dashboard;
