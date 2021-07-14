import {
	IonContent,
	IonPage,
    IonRow,
    IonItem,
    IonList,
    IonListHeader,
    IonInput
} from '@ionic/react';
import React, { useEffect, useState } from 'react';
import { Header }  from '../components/Header';
import axios from 'axios';
import { FooterNav } from '../components/FooterNav';
import { useAuth0 } from "@auth0/auth0-react";

const Details: React.FC = (props: any) => {
    const [ noDocs, setNoDocs ] = useState<boolean>(true);
    const [ originalDocList, setOriginalDocList] = useState<any>(undefined);
    const [ filteredDocList, setFilteredDocList ] = useState<any>(undefined);
    const { user, isAuthenticated, isLoading } = useAuth0();
 
    useEffect(() => {	
            const email = ''

            const api = axios.create({
                baseURL: process.env.REACT_APP_GAINVEST_API
                //baseURL: 'http://localhost:3000'
            });
            api.get(`/documents/investor/${email}`).then((response) => {
                const data = response.data;
                let legal: any = [];
                let finance: any = [];
                let accounting: any = [];

                data.map((doc: any) => {
                    if (doc.category == 'L') {
                        legal.push(doc);
                    }
                    else if (doc.category == 'F') {
                        finance.push(doc);
                    }
                    else {
                        accounting.push(doc);
                    }
                });
                
                if (data.length > 0) {
                    setOriginalDocList({
                        legal: legal,
                        finance: finance,
                        accounting: accounting
                    });
                    setFilteredDocList({
                        legal: legal,
                        finance: finance,
                        accounting: accounting
                    });
                    
                    setNoDocs (false);
                }
            })
	},[]);

    async function fundSearch(search_value:any) {
        console.log(search_value);
        let legal: any = originalDocList ? originalDocList.legal : [];
        let finance: any = originalDocList ? originalDocList.finance : [];
        let accounting: any = originalDocList ? originalDocList.accounting : [];

        let filtered_legal = await legal.filter((doc:any) => {
            let found = false;
            if (doc.fund_name) {
                if (doc.fund_name.toLowerCase().indexOf(search_value.toLowerCase()) > -1) {
                    found= true
                }
            }

            if (doc.type) {
                if (doc.type.toLowerCase().indexOf(search_value.toLowerCase()) > -1) {
                    found= true
                }
            }

            return found;
        });

        let filtered_finance = await finance.filter((doc:any) => {
            let found = false;
            if (doc.fund_name) {
                if (doc.fund_name.toLowerCase().indexOf(search_value.toLowerCase()) > -1) {
                    found= true
                }
            }

            if (doc.type) {
                if (doc.type.toLowerCase().indexOf(search_value.toLowerCase()) > -1) {
                    found= true
                }
            }

            return found;
        });

        let filtered_accounting = await accounting.filter((doc:any) => {
            let found = false;
            if (doc.fund_name) {
                if (doc.fund_name.toLowerCase().indexOf(search_value.toLowerCase()) > -1) {
                    found= true
                }
            }

            if (doc.type) {
                if (doc.type.toLowerCase().indexOf(search_value.toLowerCase()) > -1) {
                    found= true
                }
            }

            return found;
        });
        
        setFilteredDocList({
            legal: filtered_legal,
            finance: filtered_finance,
            accounting: filtered_accounting
        });
    }
    

	return (
        <IonPage>
            <Header/>
            <IonContent className="light bg-and-text">
                <h1 style={{ textAlign: 'center', marginBottom: '30px' }}>Your Data Hub</h1>
                <IonRow>
                    <IonInput
                        onKeyUp={(e) => fundSearch(e.currentTarget.value)}
                        type="text"
                        placeholder="Search Documents"
                        style={{borderBottom: "1px solid #d7d7d7"}}
                    />
                </IonRow>
                { filteredDocList &&
                    <IonRow>
                        { filteredDocList.legal.length > 0 &&
                            <IonList className="docs-list">
                                <IonListHeader className="section-header">
                                    Legal
                                </IonListHeader>
                                {
                                    filteredDocList.legal.map((val:any, index:any) => {
                                        return <IonItem className="bg-and-text no-border" style={{display: "flex"}}>
                                                    <IonRow style={{flex: 4}}>
                                                        <div className="div-label" style={{marginBottom: "8px", display: "block", width: "100%", color: '#a3a3a3'}}>
                                                            {val.fund_name}
                                                        </div>
                                                        <div style={{marginBottom: "8px", display: "block"}}>
                                                            {val.type}
                                                        </div>
                                                    </IonRow>
                                                    <IonRow style={{flex: 1, justifyContent: "flex-end"}}>
                                                        <div>
                                                            <a className="anchor-button" href="https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png">View</a>
                                                        </div>
                                                    </IonRow>
                                                </IonItem>    
                                    })
                                }
                            </IonList>
                        }
                        { filteredDocList.finance.length > 0 &&
                            <IonList className="docs-list">
                                <IonListHeader className="section-header">
                                    Finance
                                </IonListHeader>
                                {
                                    filteredDocList.finance.map((val:any, index:any) => {
                                        return <IonItem className="bg-and-text no-border" style={{display: "flex"}}>
                                            <IonRow style={{flex: 4}}>
                                                <div className="div-label" style={{marginBottom: "8px", display: "block", width: "100%"}}>
                                                    {val.fund_name}
                                                </div>
                                                <div style={{marginBottom: "8px", display: "block"}}>
                                                    {val.type}
                                                </div>
                                            </IonRow>
                                            <IonRow style={{flex: 1, justifyContent: "flex-end"}}>
                                                <div>
                                                    <a className="anchor-button" href="https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png">View</a>
                                                </div>
                                            </IonRow>
                                        </IonItem>    
                                    })
                                }
                            </IonList>
                        }
                        { filteredDocList.accounting.length > 0 &&
                            <IonList className="docs-list">
                                <IonListHeader className="section-header">
                                    Accounting
                                </IonListHeader>
                                {
                                    filteredDocList.accounting.map((val:any, index:any) => {
                                        return <IonItem className="bg-and-text no-border" style={{display: "flex"}}>
                                            <IonRow style={{flex: 4}}>
                                                <div className="div-label" style={{marginBottom: "8px", display: "block", width: "100%"}}>
                                                    {val.fund_name}
                                                </div>
                                                <div style={{marginBottom: "8px", display: "block"}}>
                                                    {val.type}
                                                </div>
                                            </IonRow>
                                            <IonRow style={{flex: 1, justifyContent: "flex-end"}}>
                                                <div>
                                                    <a className="anchor-button" href="https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png">View</a>
                                                </div>
                                            </IonRow>
                                        </IonItem>        
                                    })
                                }
                            </IonList>
                        }
                    </IonRow>
                }
            </IonContent>
            <FooterNav />
        </IonPage>
	);
};

export default Details;
