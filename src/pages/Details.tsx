import {
	IonContent,
	IonPage,
    IonIcon,
    IonGrid,
    IonRow,
    IonCol,
    IonApp,
    IonAvatar,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonToolbar,
    IonList,
    IonListHeader
} from '@ionic/react';
import React, { useContext, useEffect, useState } from 'react';
import './Home.css';
import { Header }  from '../components/Header';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';
import { businessSharp, chatboxEllipsesSharp, documentOutline, documentsSharp, homeSharp } from 'ionicons/icons';

const Details: React.FC = (props: any) => {
    const [ capital, setCapital ] = useState<number>(0.00);
    const [ fundCount, setFundCount ] = useState<number>(0);
    const [ investorName, setInvestorName ] = useState<string>('');
    const [ avatar, setAvatar ] = useState<string>('');
    const [ allDocuments, setAllDocuments ] = useState<any>();
    const [ detailsPage, setDetailsPage ] = useState<any>();
    const [ userData, setUserData ] = useState<any>({});
    const [ pageData, setPageData ] = useState<any>({});
    const [ pageContent, setPageContent ] = useState<any>();
    const [ pageHeader, setPageHeader ] = useState<string>('Your Portfolio');
    const history = useHistory();

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //As January is 0.
    let yyyy = today.getFullYear();
    
    const startDate = mm + '/' + dd + '/' + yyyy;

    const user = useContext(UserContext);

    function navigate(route: string) {
        history.push({
            pathname: route,
            state: {
                data: userData
            }
        });
    }

    function changeContent(fund: string){
        setPageHeader(fund);
        
        // if (pageContent) {
            let capital = [];
            let documents = [];
            let fund_shares = [];

            if (pageData[fund]) {
                capital = pageData[fund]['capital'];
                documents = pageData[fund]['documents'];
                fund_shares = pageData[fund]['fund_shares'];
            }

            setPageContent(
                <IonList className='bg-and-text'>
                    <IonListHeader className="list-header">Capital</IonListHeader>
                    {
                        capital.map((val:any) => {
                            return <IonItem className="portfolio-item bg-and-text"><div>{val.date}</div><div className="text-align-right">{val.capital_transfer_amount}</div></IonItem>    
                        })
                    }
                    <IonListHeader className="list-header">Fund Shares</IonListHeader>
                    {
                        fund_shares.map((val:any) => {
                            return <IonItem className="portfolio-item bg-and-text"><div>{val.date}</div><div>{val.num_of_shares_purchased} Shares</div><div className="text-align-right">{val.investment_amount}</div></IonItem>    
                        })
                    }
                    <IonListHeader className="list-header">Documents</IonListHeader>
                    {
                        documents.map((val:any) => {
                            return <IonItem className="portfolio-item bg-and-text"><div>{val.type}</div><div className="text-align-right"><a className="anchor-button" href={val.document_url}>View</a></div></IonItem>    
                        })
                    }
                </IonList>
            )
        //}       
    }
 
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

            const firstName = props.location.state.data.firstName;
			const lastName = props.location.state.data.lastName;
            const name = firstName + ' ' + lastName;
            //const name = "Andre Harewood";

			const chatId = props.location.state.data.chatId;
			const token = props.location.state.data.chatToken;
			const chatApiKey = props.location.state.data.chatApiKey;

            const api = axios.create({
                baseURL: 'https://gainvest-api.com'
            });

            api.get(`/capitals/investor/${name}`)
            .then((response) => {
                let total_funds: any = {};

                response.data.map((item: any) => {
                    if (item.fund_name) {
                        if (total_funds[item.fund_name]) {
                            if (total_funds[item.fund_name]['capital']) {
                                total_funds[item.fund_name]['capital'].push({
                                    fund_name: item.fund_name,
                                    capital_transfer_amount: item.capital_transfer_amount,
                                    date: item.date
                                });
                            } else {
                                total_funds[item.fund_name]['capital'] = []
                                total_funds[item.fund_name]['capital'].push({
                                    fund_name: item.fund_name,
                                    capital_transfer_amount: item.capital_transfer_amount,
                                    date: item.date
                                });
                            }
                        } else {
                            total_funds[item.fund_name] = {};
                            total_funds[item.fund_name]['capital'] = [];
                            total_funds[item.fund_name]['capital'].push({
                                fund_name: item.fund_name,
                                capital_transfer_amount: item.capital_transfer_amount,
                                date: item.date
                            });
                        }
                    }
                });
                
                return total_funds;
            }).then((total_funds) => {
                const api = axios.create({
                    //baseURL: 'http://localhost:3000'
                    baseURL: 'https://gainvest-api.com'
                });

                api.get(`/documents/investor/${name}`)
                .then((response) => { 
                    response.data.map((item: any) => {
                        if (item.fund_name) {
                            if (total_funds[item.fund_name]) {
                                if (total_funds[item.fund_name]['documents']) {
                                    total_funds[item.fund_name]['documents'].push({
                                        type: item.type,
                                        document_url: item.document_url
                                    });
                                } else {
                                    total_funds[item.fund_name]['documents'] = []
                                    total_funds[item.fund_name]['documents'].push({
                                        type: item.type,
                                        document_url: item.document_url
                                    });
                                }
                            } else {
                                total_funds[item.fund_name] = {};
                                total_funds[item.fund_name]['documents'] = [];
                                total_funds[item.fund_name]['documents'].push({
                                    type: item.type,
                                    document_url: item.document_url
                                });
                            }
                        }
                    });

                    return total_funds;

                }).then((total_funds) => { 
                    const api = axios.create({
                        //baseURL: 'http://localhost:3000'
                        baseURL: 'https://gainvest-api.com'
                    });
    
                    api.get(`/fund-shares/investor/${name}`)
                    .then((response) => { 
                        response.data.map((item: any) => {
                            if (item.fund_name) {
                                if (total_funds[item.fund_name]) {
                                    if (total_funds[item.fund_name]['fund_shares']) {
                                        total_funds[item.fund_name]['documents'].push({
                                            date: item.date,
                                            num_of_shares_purchased: item.num_of_shares_purchased,
                                            investment_amount: item.investment_amount
                                        });
                                    } else {
                                        total_funds[item.fund_name]['fund_shares'] = []
                                        total_funds[item.fund_name]['fund_shares'].push({
                                            date: item.date,
                                            num_of_shares_purchased: item.num_of_shares_purchased,
                                            investment_amount: item.investment_amount
                                        });
                                    }
                                } else {
                                    total_funds[item.fund_name] = {};
                                    total_funds[item.fund_name]['fund_shares'] = [];
                                    total_funds[item.fund_name]['fund_shares'].push({
                                        date: item.date,
                                        num_of_shares_purchased: item.num_of_shares_purchased,
                                        investment_amount: item.investment_amount
                                    });
                                }
                            }
                        });

                        let fund_names:any = [];
                        let investor_info:any = [];

                        for (const [key, value] of Object.entries(total_funds)) {
                            fund_names.push(key);
                            investor_info.push(value);
                        }

                        // console.log(total_funds);

                        setPageData(total_funds);

                        setAllDocuments(
                            <IonItem className="select-label">
                                <IonLabel className="select-label">Funds</IonLabel>
                                <IonSelect onIonChange={e => changeContent(e.detail.value!)} className="select-label" interface="popover">
                                    { 
                                        fund_names.map((val:any, index:any) => {
                                            return <IonSelectOption className="select-label" value={val}>{val}</IonSelectOption>    
                                        })
                                    }
                                </IonSelect>
                            </IonItem>
                        );
                    });
                });
		    });    
        }
	},[props]);

	return (
        <IonApp>
            <IonPage>
                <Header/>
                <IonContent className="light">
                    <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>{pageHeader}</h1>
                    {allDocuments}
                    {pageContent}
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

export default Details;
