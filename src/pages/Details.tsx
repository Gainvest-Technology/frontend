import {
	IonContent,
	IonPage,
    IonIcon,
    IonRow,
    IonCol,
    IonSelect,
    IonSelectOption,
    IonItem,
    IonLabel,
    IonToolbar,
    IonList,
    IonListHeader
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Header }  from '../components/Header';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { businessSharp, chatboxEllipsesSharp, documentOutline, documentsSharp, gridOutline, homeSharp } from 'ionicons/icons';
import async from 'async';

const Details: React.FC = (props: any) => {
    // const [ capital, setCapital ] = useState<number>(0.00);
    // const [ fundCount, setFundCount ] = useState<number>(0);
    // const [ investorName, setInvestorName ] = useState<string>('');
    // const [ avatar, setAvatar ] = useState<string>('');
    // const [ allDocuments, setAllDocuments ] = useState<any>();
    // const [ detailsPage, setDetailsPage ] = useState<any>();
    // const [ userData, setUserData ] = useState<any>({});
    // const [ pageData, setPageData ] = useState<any>({});
    // const [ pageContent, setPageContent ] = useState<any>({});
    // const [ showDetails, setShowDetails ] = useState<boolean>(false);
    // const [ fundData, setFundData ] = useState<boolean>(false);

    const [ pageData, setPageData ] = useState<any>({
        token: '',
        chatToken: '',
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        chatApiKey: '',
        chatId: '',
        fundNames: [],
        investorData: {},
        capital: [],
        fund_shares: [],
        documents: [],
        showDetails: false
    });

    const history = useHistory();

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth()+1; //As January is 0.
    let yyyy = today.getFullYear();
    
    //const startDate = mm + '/' + dd + '/' + yyyy;

    //const user = useContext(UserContext);

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

    function changeContent(fund: string){
        // if (pageContent) {
            let capital = [];
            let documents = [];
            let fund_shares = [];

            capital = pageData.investorData[fund]['capital'];
            documents = pageData.investorData[fund]['documents'];
            fund_shares = pageData.investorData[fund]['fund_shares'];

            setPageData({
                token: pageData.token,
                chatToken: pageData.chatToken,
                firstName: pageData.firstName,
                lastName: pageData.lastName,
                email: pageData.email,
                id: pageData.id,
                chatApiKey: pageData.chatApiKey,
                chatId: pageData.chatId,
                capital: capital,
                documents: documents,
                fund_shares: fund_shares,
                showDetails: true
            })

            
        //}       
    }

    function getCapital(id:string, callback:any) {
        const api = axios.create({
            //baseURL: 'http://localhost:3000'
            baseURL: 'https://gainvest-api.com'
        });

        api.get(`/capitals/investor/${id}`)
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
            
            callback(null, total_funds, id);
        });
    }

    function getFundShares(total_funds:any, id:string, callback:any) {
        const api = axios.create({
            //baseURL: 'http://localhost:3000'
            baseURL: 'https://gainvest-api.com'
        });

        api.get(`/documents/investor/${id}`)
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

            callback(null, total_funds, id);
        });
    }

    function getDocuments(total_funds:any, id:string, callback:any) {
        const api = axios.create({
            //baseURL: 'http://localhost:3000'
            baseURL: 'https://gainvest-api.com'
        });

        api.get(`/fund-shares/investor/${id}`)
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

            callback(null, total_funds);
        });
    }
 
    useEffect(() => {
        if (props.location.state) {
            const firstName = props.location.state.data.firstName;
			const lastName = props.location.state.data.lastName;
            const id = props.location.state.data.id;
            //const name = "Andre Harewood";

            async.waterfall([
                async.constant(id),
                getCapital,
                getFundShares,
                getDocuments,
            ], function (err, result:any) {
                let fund_names:any = [];
                let investor_info:any = [];

                for (const [key, value] of Object.entries(result)) {
                    fund_names.push(key);
                    investor_info.push(value);
                }

                setPageData({
                    token: props.location.state.data.token,
                    chatToken: props.location.state.data.chatToken,
                    firstName: props.location.state.data.firstName,
                    lastName: props.location.state.data.lastName,
                    email: props.location.state.data.email,
                    id: props.location.state.data.id,
                    chatApiKey: props.location.state.data.chatApiKey,
                    chatId: props.location.state.data.chatId,
                    fund_names: fund_names,
                    fund_data: result
                });

                console.log(investor_info);

                //setPageData(result);
            });
        }
	},[props]);

	return (
            <IonPage>
                <Header/>
                <IonContent className="light">
                    <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Your Portfolio</h1>
                    <IonList className="docs-list">
                        <IonListHeader>
                            Legal
                        </IonListHeader>
                    </IonList>
                    <IonList className="docs-list">
                        <IonListHeader>
                            Finance
                        </IonListHeader>
                    </IonList>
                    <IonList className="docs-list">
                        <IonListHeader>
                            Accounting
                        </IonListHeader>
                    </IonList>
                    <IonItem className="select-label" style={{ marginBottom: '30px' }}>
                        <IonLabel className="select-label">My Funds</IonLabel>
                        <IonSelect onIonChange={e => changeContent(e.detail.value!)} className="select-label" interface="popover">
                            { pageData.fundNames &&
                                pageData.fundNames.map((val:any, index:any) => {
                                    return <IonSelectOption className="select-label" value={val}>{val}</IonSelectOption>    
                                })
                            }
                        </IonSelect>
                    </IonItem>
                    {pageData.showDetails && 
                        <IonList className='bg-and-text'>
                        <IonListHeader className="list-header">Capital</IonListHeader>
                        {
                            pageData.capital.map((val:any, index:any) => {
                                const key: string = val.date + val.capital_transfer_amount + index;
                                return <IonItem key={key} className="portfolio-item bg-and-text"><div key={key}>{val.date}</div><div key={key} className="text-align-right">{val.capital_transfer_amount}</div></IonItem>    
                            })
                        }
                        <IonListHeader className="list-header">Fund Shares</IonListHeader>
                        {
                            pageData.fund_shares.map((val:any, index:any) => {
                                const key: string = val.date + val.num_of_shares_purchased + val.investment_amount + index;
                                return <IonItem key={key} className="portfolio-item bg-and-text"><div key={key}>{val.date}</div><div key={key}>{val.num_of_shares_purchased} Shares</div><div key={key} className="text-align-right">{val.investment_amount}</div></IonItem>    
                            })
                        }
                        <IonListHeader className="list-header">Documents</IonListHeader>
                        {
                            pageData.documents.map((val:any, index:any) => {
                                const key: string = val.date + val.type + val.investment_amount + val.document_url + index;
                                return <IonItem className="portfolio-item bg-and-text"><div key={key}>{val.type}</div><div key={key} className="text-align-right"><a key={key} className="anchor-button" href={val.document_url}>View</a></div></IonItem>    
                            })
                        }
                    </IonList>
                    }
                    
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

export default Details;
