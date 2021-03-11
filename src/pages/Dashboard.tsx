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
    //const [ startDate, setStartDate ] = useState<any>(undefined);
    const [ investorName, setInvestorName ] = useState<string>('');
    const [ avatar, setAvatar ] = useState<string>('');
    const [ userData, setUserData ] = useState<any>({});

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //As January is 0.
    let yyyy = today.getFullYear();
    
    const startDate = mm + '/' + dd + '/' + yyyy;

    const user = useContext(UserContext);
 
    useEffect(() => {
		if (props.location.state) {
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
            });


            setInvestorName(firstName + ' ' + lastName);
            setAvatar('https://getstream.io/random_svg/?name=' + firstName);

            const investor = firstName + ' ' + lastName;
            //const investor = 'Andre Harewood';

            const api = axios.create({
                baseURL: 'https://gainvest-api.com'
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
        
                setCapital(formattedCapital);
                setFundCount(total_funds.length);
            })
            .catch((error) => {
                setCapital(0);
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

	return (
        <IonApp>
            <IonPage>
                <Header/>
                <IonContent className="light">
                    <h1 className="h1">Gainvestor Snapshot</h1>
                    <IonGrid>
                        <IonRow className='box-shadow' style={{ margin:'0px 20px 20px 20px' }}>
                            <IonCol>
                                <div className="flex-container" style={{ height: '100px', margin:'20px', alignItems:'center' }}>
                                    <IonAvatar style={{ flex: '1', height: '80px' }}>
                                        <img src={avatar}/>
                                    </IonAvatar>
                                    <div className="banner" style={{ flex: '3', marginLeft:'20px'}}>
                                        <h3>
                                            {userData.firstName + ' ' + userData.lastName}
                                        </h3>
                                        <h5>
                                            {userData.email}
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
                                <div className='stat-header'><IonIcon icon={logoUsd} style={{ position: 'relative', top: '3px' }}></IonIcon>{capital}</div>
                                <div className='stat-label'>Total Amount Invested</div>
                            </IonCol>
                            <IonCol className='stat-container'>
                                <div className='stat-header'><IonIcon icon={businessSharp} style={{ position: 'relative', top: '2px', left: '-5px' }}></IonIcon>{fundCount}</div>
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
                {/* <IonFooter> */}
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
                {/* </IonFooter> */}
                    {/* <IonTabs>
                        <IonTabBar slot="bottom" className="menu-tabs">
                            <IonTabButton tab="dashboard">
                                <IonIcon icon={homeSharp} />
                                <IonLabel>Home</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="chat">
                                <IonIcon icon={chatboxEllipsesSharp} />
                                <IonLabel>Chat</IonLabel>
                            </IonTabButton>
                            <IonTabButton tab="">
                                <IonIcon icon={menuSharp} />
                                <IonLabel>Menu</IonLabel>
                            </IonTabButton>
                        </IonTabBar>
                    </IonTabs> */}
            </IonPage>
        </IonApp>
	);
};

export default Dashboard;
