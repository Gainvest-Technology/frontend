import {
	IonContent,
	IonPage,
	IonItem,
	IonLabel,
	IonInput,
	IonButton,
	IonRow,
	IonCol,
	IonAlert,
	IonImg,
	IonSlide,
	IonSlides,
	IonCheckbox,
	IonFooter,
	IonToolbar,
	IonIcon
} from '@ionic/react';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { arrowBackOutline, arrowForwardOutline, checkbox, text } from 'ionicons/icons';
import { Header } from '../components/Header';
import '../assets/gainvest.css';
import { any } from 'async';
import { MessageActionsBox } from 'stream-chat-react';


const slideOpts = {
	initialSlide: 0,
	speed: 400
};

export const Questions: React.FC = () => {

	const mySlides = useRef<HTMLIonSlidesElement>(null);

	const [disablePrevBtn, setDisablePrevBtn] = useState(true);
	const [disableNextBtn, setDisableNextBtn] = useState(false);


	const handleSlideChange = async () => {
		const swiper = await mySlides.current?.getSwiper();
		setDisablePrevBtn(swiper.activeIndex === 0);
		setDisableNextBtn(swiper.activeIndex === swiper.slides.length -1);

	}

	const onBtnClicked = async (direction: string) => {
		const swiper = await mySlides.current?.getSwiper();
		if (direction === "next") {
		  swiper.slideNext();
		} else if (direction === "prev") {
		  swiper.slidePrev();
		}
	  };

	  useEffect(() => {
		  window.addEventListener('keyup', async function(e) {
			if (q2.length > 0 && e.key === 'Enter') {
				e.preventDefault();
				const swiper = await mySlides.current?.getSwiper();
				swiper.slideNext();
			}
		  });
	  },[]);
	  
	
	



	const history = useHistory();
	const [ q1, setQ1 ] = useState<string>('');
	const [ q2, setQ2 ] = useState<string>('');
	const [ q3, setQ3 ] = useState<string>('');
	const [ q4, setQ4 ] = useState<string>('');
	const [ q5, setQ5 ] = useState<string>('');
	const [ q6, setQ6 ] = useState<string>('');
	const [ q7, setQ7 ] = useState<string>('');
	const [ q8, setQ8 ] = useState<string>('');
	const [ q9, setQ9 ] = useState<string>('');
	const [ q10, setQ10 ] = useState<string>('');
	const [ q11, setQ11 ] = useState<string>('');
	const [ q12, setQ12 ] = useState<string>('');
	const [ q13, setQ13 ] = useState<string>('');
	const [ q14, setQ14 ] = useState<string>('');
	const [ q15, setQ15 ] = useState<string>('');
	const [ q16, setQ16 ] = useState<string>('');
	const [ q17, setQ17 ] = useState<string>('');
	const [ q18, setQ18 ] = useState<string>('');
	const [ q19, setQ19 ] = useState<string>('');
	const [ q20, setQ20 ] = useState<string>('');
	const [ q21, setQ21 ] = useState<string>('');
	const [ q22, setQ22 ] = useState<string>('');
	const [ q23, setQ23 ] = useState<string>('');
	const [ q24, setQ24 ] = useState<string>('');

	const handleSubmit = async (event: { preventDefault: () => void }) => {
		const submitData = {
			q1: q1,
			q2: q2,
			q3: q3,
			q4: q4,
			q5: q5,
			q6: q6,
			q7: q7,
			q8: q8,
			q9: q9,
			q10: q10,
			q11: q11,
			q12: q12,
			q13: q13,
			q14: q14,
			q15: q15,
			q16: q16,
			q17: q17,
			q18: q18,
			q19: q19,
			q20: q20,
			q21: q21,
			q22: q22,
			q23: q23,
			q24: q24
		};

		const api = axios.create({
			baseURL: 'https://gainvest-api.com'
			//baseURL: 'http://localhost:3000'
		});
		api.post('/users/login', submitData).then((response) => {
			if (response.data.needsUpdate) {
				history.push({
					pathname: '/new_password',
					state: {
						data: {
							email: response.data.email
						}
					}
				});
			} else {
				history.push({
					pathname: '/dashboard',
					state: {
						data: {
							token: response.data.token,
							chatToken: response.data.chatToken,
							firstName: response.data.firstName,
							lastName: response.data.lastName,
							email: response.data.email,
							id: response.data.userId,
							chatApiKey: response.data.chatApiKey,
							chatId: response.data.chatId
						}
					}
				});
			}
		});
		/*.catch((error) => {
				setMessage('Email and/or Password Is Incorrect');
				setIserror(true);
			});*/
	};

	return (
		<IonPage>
			<IonContent fullscreen>
				<div className="backy" style={{ height: '100%', width: '100%', background: '#203354' }}>
					<IonRow>
						<IonCol class="logo-container">
							<IonImg
								class="logo"
								src="https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png"
							/>
						</IonCol>
					</IonRow>
					<div style={{ color: '#999', textAlign: 'center', paddingTop: '40px', fontSize: '35px' }}>
						Investor Onboarding
					</div>
					<form className="form" style={{ background: '100vh' }}>
						<IonSlides
							options={slideOpts}
							style={{ height: '100%', backgroundColor: 'transparent', color: '#ededed' }}
							pager={true}
							class="swiper-no-swiping"
							ref={mySlides}
							onIonSlideDidChange={handleSlideChange}
						>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh'}}>
									<p>What is the name of the entity? </p>
									<IonInput
										type="text"
										id="one"
										value={q1}
										onIonChange={(e) => setQ1(e.detail.value!)}
										placeholder="Enter Input"
										required
										
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'
										
									}}

									/>
								</form>
							</IonSlide>

							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What is the entity type? (i.e. limited liability company) </p>
									<IonInput
										type="text"
										value={q2}
										onIonChange={(e) => setQ2(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What is the address of the entity? </p>
									<IonInput
										type="text"
										value={q3}
										onIonChange={(e) => setQ3(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>In which state should the entity be registered? (Delaware default)</p>
									<IonInput
										type="text"
										value={q4}
										onIonChange={(e) => setQ4(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What is the phone number of the entity?</p>
									<IonInput
									
										type="text"
										
										value={q5}
										onIonChange={(e) => setQ5(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What is the email for the entity?</p>
									<IonInput
				
										type="text"
									
										value={q6}
										onIonChange={(e) => setQ6(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What is the total offering amount of the entity? (can be indefinite) </p>
									<IonInput
									
										type="text"
										
										value={q7}
										onIonChange={(e) => setQ7(e.detail.value!)}
										placeholder="Enter Input"
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What is the minimum amount invetors can invest? </p>
									<IonInput
									
										type="text"
									
										value={q8}
										onIonChange={(e) => setQ8(e.detail.value!)}
										placeholder="Enter Input"
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What is the minimum amount the entity must raise to close the offering?</p>
									<IonInput
										
										type="text"
										
										value={q9}
										onIonChange={(e) => setQ9(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>How much money has already been contributed to the entity? </p>
									<IonInput
									
										type="text"
									
										value={q10}
										onIonChange={(e) => setQ10(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>How many investors have already contributed to the entity?</p>
									<IonInput
										
										type="text"
										
										value={q11}
										onIonChange={(e) => setQ11(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What is the name of the general partner/operator?</p>
									<IonInput
										
										type="text"
										
										value={q12}
										onIonChange={(e) => setQ12(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>In which state is the general partner/operator registered/residing?</p>
									<IonInput
										
										type="text"
										
										value={q13}
										onIonChange={(e) => setQ13(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>
										Who is the registered agent? (Must be person or service in the registration
										state)
									</p>
									<IonInput
										
										type="text"
										
										value={q14}
										onIonChange={(e) => setQ14(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>Who is the responsible party? (Must be natural person) </p>
									<IonInput
										
										type="text"
										
										value={q15}
										onIonChange={(e) => setQ15(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>
										What is the responsible party's Social Security Number (Necessary to apply for
										EIN)
									</p>
									<IonInput
										
										type="text"
								
										value={q16}
										onIonChange={(e) => setQ16(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>Will the investors receive 100% of returns until whole?</p>
									<IonInput
										
										type="text"
										
										value={q17}
										onIonChange={(e) => setQ17(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>Will you offer a preferred return? If so, what are the terms?</p>
									<IonInput
										
										type="text"
										
										value={q18}
										onIonChange={(e) => setQ18(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>Will you offer a hurdle rate?</p>
									<IonInput
										
										type="text"
										
										value={q19}
										onIonChange={(e) => setQ19(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What, if any, is the management fee?</p>
									<IonInput
										
										type="text"
										
										value={q20}
										onIonChange={(e) => setQ20(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What, if any, is the administration fee?</p>
									<IonInput
										
										type="text"
										
										value={q21}
										onIonChange={(e) => setQ21(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What, if any, are the other fees?</p>
									<IonInput
										
										type="text"
										
										value={q22}
										onIonChange={(e) => setQ22(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>What, if any, is the carry interest for the general partner?</p>
									<IonInput
										
										type="text"
										
										value={q23}
										onIonChange={(e) => setQ23(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
							</IonSlide>
							<IonSlide style={{ display: 'block', marginTop: '25px' }}>
								<form className="form" style={{ background: '100vh' }}>
									<p>Are there any other important terms?</p>
									<IonInput
									
										type="text"
										
										value={q24}
										onIonChange={(e) => setQ24(e.detail.value!)}
										placeholder="Enter Input"
										required
										style={{ marginBottom: '50px',
							 			borderBottom: '1px solid #fff', width: '300px'}}
									/>
								</form>
								<IonItem className="cert">
									<IonLabel>
										I hereby certify that the above statements are true and correct to the best of
										my knowledge
									</IonLabel>
									<IonCheckbox slot="start" id='box'/>
								</IonItem>
								<IonButton
									type="button"
									className="ion-margin-top"
									expand="block"
									onClick={handleSubmit}
									disabled={
										!q1 ||
										!q2 ||
										!q3 ||
										!q4 ||
										!q5 ||
										!q6 ||
										!q7 ||
										!q8 ||
										!q9 ||
										!q10 ||
										!q11 ||
										!q12 ||
										!q13 ||
										!q14 ||
										!q15 ||
										!q16 ||
										!q17 ||
										!q18 ||
										!q19 ||
										!q20 ||
										!q21 ||
										!q22 ||
										!q23 ||
										!q24 
									}
									style={{
										width: '30%',
										margin: '0 auto',
										marginBottom: '40px',
										color: '#000'
									}}
								>
									Submit
								</IonButton>
							</IonSlide>
						</IonSlides>
					</form>
					<div style={{ textAlign: 'center' }}>
						<IonButton disabled={disablePrevBtn} onClick={() => onBtnClicked("prev")}>
							<IonIcon icon={arrowBackOutline} style={{ position: 'relative', top: '3px' }} />
						</IonButton>
						<IonButton disabled={disableNextBtn} onClick={() => onBtnClicked("next")}>
							<IonIcon icon={arrowForwardOutline} style={{ position: 'relative', top: '3px' }} />
						</IonButton>
					</div>

					<div style={{ textAlign: 'center', paddingTop: 12 }} />
				</div>
			</IonContent>
			<IonFooter>
				<IonToolbar color="dark">
					<p style={{ fontSize: 'medium', textAlign: 'center', paddingBottom: '0px' }}>
						&copy; 2021 Gainvest Holdings LLC All rights reserved.
					</p>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default Questions;
