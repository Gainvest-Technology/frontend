import {
	IonContent,
	IonPage,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonApp,
    IonAvatar,
    IonLabel,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonToolbar
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import { logoUsd, businessSharp, peopleSharp, calendarSharp, homeSharp, chatboxEllipsesSharp, documentsSharp } from 'ionicons/icons';
import { Header }  from '../components/Header';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Dashboard: React.FC = (props: any) => {
    const history = useHistory();
    //const [ startDate, setStartDate ] = useState<any>(undefined);
    const [ investorName, setInvestorName ] = useState<string>('');
    const [ avatar, setAvatar ] = useState<string>('');
    const [ userData, setUserData ] = useState<any>({});

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //As January is 0.
    let yyyy = today.getFullYear();
    
    const startDate = mm + '/' + dd + '/' + yyyy;

    // const user = useContext(UserContext);

    const [ pageData, setPageData ] = useState<any>({
        token: '',
        chatToken: '',
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        chatApiKey: '',
        chatId: '',
        avatar: '',
        capitalAmount: 0.00,
        fundCount: 0,
        fundNames: [],
        investorData: {},
        capital: [],
        fund_shares: [],
        documents: [],
        showDetails: false,
		activeFunds: []
    });
 
    useEffect(() => {
		if (props.location.state) {
			const firstName = props.location.state.data.firstName;
			const lastName = props.location.state.data.lastName;
            const name = firstName + ' ' + lastName;

			const chatId = props.location.state.data.chatId;
			const token = props.location.state.data.chatToken;
			const chatApiKey = props.location.state.data.chatApiKey;


            setAvatar('https://getstream.io/random_svg/?name=' + firstName);

            const investor = firstName + ' ' + lastName;
            //const investor = 'Andre Harewood';

            const api = axios.create({
                 baseURL: 'https://gainvest-api.com'
                //baseURL: 'http://localhost:3000'
            });
            api.get(`/capitals/investor/${investor}`).then((response) => {
                let total_amount: number = 0.0;
                let total_funds: any = [];

                response.data.map((item: any) => {
                    let raw_amount  = item.capital_transfer_amount.replace('$', '').replace(',','');
                    total_amount += parseFloat(raw_amount);

                    if (total_funds.indexOf(item.fund_name < 0)) {
                        total_funds.push(item.fund_name);
                    }
                })

                const formattedCapital: any = total_amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')

                setPageData({
                    token: props.location.state.data.token,
                    chatToken: props.location.state.data.chatToken,
                    firstName: props.location.state.data.firstName,
                    lastName: props.location.state.data.lastName,
                    email: props.location.state.data.email,
                    id: props.location.state.data.id,
                    chatApiKey: props.location.state.data.chatApiKey,
                    chatId: props.location.state.data.chatId,
                    avatar: 'https://getstream.io/random_svg/?name=' + firstName,
                    capitalAmount: formattedCapital,
                    fundCount: total_funds.length
                })
            })
            .catch((error) => {

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
                <h1 className="h1">Gainvestor Snapshot</h1>
                <IonGrid>
                    <IonRow className='box-shadow' style={{ margin:'0px 20px 20px 20px' }}>
                        <IonCol>
                            <div className="flex-container" style={{ height: '100px', margin:'20px', alignItems:'center' }}>
                                <IonAvatar style={{ flex: '1', height: '80px', maxWidth: '80px'}}>
                                    <img src={pageData.avatar}/>
                                </IonAvatar>
                                <div className="banner" style={{ flex: '3', marginLeft:'20px'}}>
                                    <h3>
                                        {pageData.firstName + ' ' + pageData.lastName}
                                    </h3>
                                    <h5>
                                        {pageData.email}
                                    </h5>
                                </div>
                            </div>
                            <div className="flex-container">
                                <div className="flex-child">
                                    <IonCard className="card">
                                        <IonCardHeader className="card-header" style={{ background: '#ff0000'}}>
                                            0
                                        </IonCardHeader>
                                        <IonCardContent className="card-content">
                                            Gainvest Score
                                        </IonCardContent>
                                    </IonCard>
                                </div>
                                <div className="flex-child">
                                    <IonCard className="card">
                                        <IonCardHeader className="level">
                                            Beginner
                                        </IonCardHeader>
                                        <IonCardContent className="card-content">
                                            Gainvestor Level
                                        </IonCardContent>
                                    </IonCard>
                                </div>
                            </div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='stat-container'>
                            <div className='stat-header'><IonIcon icon={logoUsd} style={{ position: 'relative', top: '3px' }}></IonIcon>{pageData.capitalAmount}</div>
                            <div className='stat-label'>Total Amount Invested</div>
                        </IonCol>
                        <IonCol className='stat-container'>
                            <div className='stat-header'><IonIcon icon={businessSharp} style={{ position: 'relative', top: '2px', left: '-5px' }}></IonIcon>{pageData.fundCount}</div>
                            <div className='stat-label'>Total Funds Invested</div>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol className='stat-container'>
                            <div className='stat-header'><IonIcon icon={peopleSharp} style={{ position: 'relative', top: '3px', left: '-5px'  }}></IonIcon>0</div>
                            <div className='stat-label'>Gainvestor Interactions</div>
                        </IonCol>
                        <IonCol className='stat-container'>
                            <div className='stat-header'><IonIcon icon={calendarSharp} style={{ position: 'relative', top: '3px', left: '-5px'  }}></IonIcon>1</div>
                            <div className='stat-label'>Days As A Gainvestor</div>
                        </IonCol>
                    </IonRow>
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
