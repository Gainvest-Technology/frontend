import {
	IonContent,
	IonPage,
    IonGrid,
    IonRow,
    IonCol
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Header }  from '../components/Header';
import axios from 'axios';
import { useAuth0 } from "@auth0/auth0-react";
import { FooterNav } from '../components/FooterNav';

const Funds: React.FC = (props: any) => {
    const { user, isAuthenticated, isLoading } = useAuth0();

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
                activeFunds: activeFunds
            })             
        })
	},[]);

	return (
            <IonPage>
                <Header/>
                <IonContent className="dark">
                    <h1 className="h1">Available Funds</h1>
                    <IonGrid>
                        {
                            pageData.activeFunds.map((fund:any, index:any) => {
                                const key: any = fund.name + index; 
                                return (
                                    <IonRow key={"fund-container" + index} className="fund-container">
                                        <IonRow key={"fund-header" + index} style={{ width: '100%'}} className="fund-header"><IonCol key={"innerCol" + index}>{fund.name}</IonCol></IonRow>
                                        <IonRow key={"1fund-row" + index} style={{ width: '100%'}} className="fund-row">
                                            <IonCol key={"startDateCol" + index}><div key={"1startDateDiv" + index} style={{textDecoration: 'underline', marginBottom: '5px'}}>Start Date</div><div key={"2startDateDiv" + index} style={{fontWeight: 'bold'}}>{fund.start_date}</div></IonCol>
                                            <IonCol key={"fundSizeCol" + index}><div key={"1fundSizeDiv" + index} style={{textDecoration: 'underline', marginBottom: '5px'}}>Total Fund Size</div><div key={"2fundSizeDiv" + index} style={{fontWeight: 'bold'}}>{fund.total_fund_size}</div></IonCol>
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
                <FooterNav />
            </IonPage>
	);
};

export default Funds;
