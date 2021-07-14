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
	IonIcon,
	IonSelect,
	IonSelectOption,
} from '@ionic/react';
import React, { useCallback, useRef, useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { arrowBackOutline, arrowForwardOutline, checkbox, text } from 'ionicons/icons';
import '../assets/gainvest.css';
import { Footer } from '../components/Footer';


const slideOpts = {
	initialSlide: 0,
	speed: 400
};

export const Questions: React.FC = () => {
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

	const [ reviewAnswers, setReviewAnswers ] = useState<boolean>(false);
	const [ showQuestions, setShowQuestions ] = useState<boolean>(true);
	const [ editMode, setEditMode ] = useState<boolean>(false);
	const [ reviewMode, setReviewMode ] = useState<boolean>(true);

	//const [ entityOrPerson, setEntityOrPerson ] = useState<string>('your');

	const [ editReview, setEditReview ] = useState<boolean>(false);

	const mySlides = useRef<HTMLIonSlidesElement>(null);
	const myBox = useRef<any>(null);



	const [disablePrevBtn, setDisablePrevBtn] = useState(true);
	const [disableNextBtn, setDisableNextBtn] = useState(false);

	const [disableSubmitBtn, setDisableSubmitBtn] = useState(true);
	const [checkBox, setCheckBox] = useState(false);
	const [agree, setAgree] = useState(false);
	const [isError, setIsError] = useState(false);
	const [message, setMessage] = useState('');
	const [dataSubmitted, setDataSubmitted] = useState(false);
	

	function goHome(): void {
		history.push({
			pathname: '/'
		});
	}

	const handleSlideChange = async () => {
		const swiper = await mySlides.current?.getSwiper();
		setDisablePrevBtn(swiper.activeIndex === 0);
		setDisableNextBtn(swiper.activeIndex === swiper.slides.length -1);

		const slide_input:any = document.querySelector('.swiper-slide-active input');

		if (slide_input) {
			slide_input.focus();
		}

		if (swiper.activeIndex == 25) {
			setShowQuestions(false);
			setReviewAnswers(true);
		}
	}

	const onBtnClicked = async (direction: string) => {
		const swiper = await mySlides.current?.getSwiper();
		if (direction === "next") {
		  swiper.slideNext();
		} else if (direction === "prev") {
		  swiper.slidePrev();
		}
	  };

	const handleKeyPress = async (event: { key: string; }) => {
		if(event.key === 'Enter'){
			const swiper = await mySlides.current?.getSwiper();
			swiper.slideNext();
		}
	  }


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
		api.post('/onboard', submitData).then((response:any) => {
			setDataSubmitted(true);
		}).catch((error) => {
			setMessage(error);
			setIsError(true);
		});
	};

	return (
		<IonPage>
			<IonContent fullscreen  >
				<div style={{ background: '#213861' }}>
					<IonRow>
						<IonCol>
							<IonAlert
								isOpen={isError}
								onDidDismiss={() => setIsError(false)}
								cssClass="my-custom-class"
								header={'Error!'}
								message={message}
								buttons={[ 'Dismiss' ]}
							/>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol>
							<IonAlert
								isOpen={dataSubmitted}
								onDidDismiss={() => goHome()}
								cssClass="my-custom-class"
								header={'Success!'}
								message={message}
								buttons={[ 'Ok' ]}
							/>
						</IonCol>
					</IonRow>
					<IonRow>
						<IonCol class="logo-container">
							<IonImg
								class="logo"
								src="https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png"
							/>
						</IonCol>
					</IonRow>

					{ showQuestions &&
					<IonSlides
						options={slideOpts}
						style={{ color: '#ededed', background: 'transparent' }}
						pager={false}
						class="swiper-no-swiping"
						ref={mySlides}
						onIonSlideDidChange={handleSlideChange}>
						
						<IonSlide style={{ display: 'block' }}>
								<h4 style={{paddingTop: '50px'}}>Please Answer A Few Questions To Help Gainvest Help You Effeciently.</h4>
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
								<p style={{paddingTop: '50px'}}>What is the name of the entity? </p>
								<IonInput
									type="text"
									id="one"
									value={q1}
									onIonChange={(e) => setQ1(e.detail.value!)}
									placeholder="Enter Input"
									onKeyPress={handleKeyPress}
									
									style={{ 
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
						</IonSlide>
					
						<IonSlide style={{ display: 'block' }}>
								<p style={{paddingTop: '50px'}}>What is the entity type? (i.e. limited liability company) </p>
								<IonInput
									type="text"
									value={q2}
									onIonChange={(e) => setQ2(e.detail.value!)}
									onKeyPress={handleKeyPress}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
						</IonSlide>

						<IonSlide style={{ display: 'block' }}>
								<p style={{paddingTop: '50px'}}>What is the address of the entity? </p>
								<IonInput
									type="text"
									value={q3}
									onIonChange={(e) => setQ3(e.detail.value!)}
									placeholder="Enter Input"
									onKeyPress={handleKeyPress}
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
								<p style={{paddingTop: '50px'}}> In which state should the entity be registered? (Delaware default)</p>
								
								<IonSelect 
									value={q4} 
									onIonChange={(e) => setQ4(e.detail.value!)}
									style={{borderBottom: '1px solid #d7d7d7', width: '80%', margin: '0 auto'}}
									>
									<IonSelectOption value="AL">Alabama</IonSelectOption>
									<IonSelectOption value="AK">Alaska</IonSelectOption>
									<IonSelectOption value="AZ">Arizona</IonSelectOption>
									<IonSelectOption value="AR">Arkansas</IonSelectOption>
									<IonSelectOption value="CA">California</IonSelectOption>
									<IonSelectOption value="CO">Colorado</IonSelectOption>
									<IonSelectOption value="CT">Connecticut</IonSelectOption>
									<IonSelectOption value="DE">Delaware</IonSelectOption>
									<IonSelectOption value="DC">District Of Columbia</IonSelectOption>
									<IonSelectOption value="FL">Florida</IonSelectOption>
									<IonSelectOption value="GA">Georgia</IonSelectOption>
									<IonSelectOption value="HI">Hawaii</IonSelectOption>
									<IonSelectOption value="ID">Idaho</IonSelectOption>
									<IonSelectOption value="IL">Illinois</IonSelectOption>
									<IonSelectOption value="IN">Indiana</IonSelectOption>
									<IonSelectOption value="IA">Iowa</IonSelectOption>
									<IonSelectOption value="KS">Kansas</IonSelectOption>
									<IonSelectOption value="KY">Kentucky</IonSelectOption>
									<IonSelectOption value="LA">Louisiana</IonSelectOption>
									<IonSelectOption value="ME">Maine</IonSelectOption>
									<IonSelectOption value="MD">Maryland</IonSelectOption>
									<IonSelectOption value="MA">Massachusetts</IonSelectOption>
									<IonSelectOption value="MI">Michigan</IonSelectOption>
									<IonSelectOption value="MN">Minnesota</IonSelectOption>
									<IonSelectOption value="MS">Mississippi</IonSelectOption>
									<IonSelectOption value="MO">Missouri</IonSelectOption>
									<IonSelectOption value="MT">Montana</IonSelectOption>
									<IonSelectOption value="NE">Nebraska</IonSelectOption>
									<IonSelectOption value="NV">Nevada</IonSelectOption>
									<IonSelectOption value="NH">New Hampshire</IonSelectOption>
									<IonSelectOption value="NJ">New Jersey</IonSelectOption>
									<IonSelectOption value="NM">New Mexico</IonSelectOption>
									<IonSelectOption value="NY">New York</IonSelectOption>
									<IonSelectOption value="NC">North Carolina</IonSelectOption>
									<IonSelectOption value="ND">North Dakota</IonSelectOption>
									<IonSelectOption value="OH">Ohio</IonSelectOption>
									<IonSelectOption value="OK">Oklahoma</IonSelectOption>
									<IonSelectOption value="OR">Oregon</IonSelectOption>
									<IonSelectOption value="PA">Pennsylvania</IonSelectOption>
									<IonSelectOption value="RI">Rhode Island</IonSelectOption>
									<IonSelectOption value="SC">South Carolina</IonSelectOption>
									<IonSelectOption value="SD">South Dakota</IonSelectOption>
									<IonSelectOption value="TN">Tennessee</IonSelectOption>
									<IonSelectOption value="TX">Texas</IonSelectOption>
									<IonSelectOption value="UT">Utah</IonSelectOption>
									<IonSelectOption value="VT">Vermont</IonSelectOption>
									<IonSelectOption value="VA">Virginia</IonSelectOption>
									<IonSelectOption value="WA">Washington</IonSelectOption>
									<IonSelectOption value="WV">West Virginia</IonSelectOption>
									<IonSelectOption value="WI">Wisconsin</IonSelectOption>
									<IonSelectOption value="WY">Wyoming</IonSelectOption>
								</IonSelect>
								
								{/* <IonInput
									type="text"
									value={q4}
									onIonChange={(e) => setQ4(e.detail.value!)}
									placeholder="Enter Input"
									onKeyPress={handleKeyPress}
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/> */}
								
						</IonSlide>

						<IonSlide style={{ display: 'block' }}>
								<p style={{paddingTop: '50px'}}>What is the phone number of the entity?</p>
								<IonInput
									type="number"
									value={q5}
									onIonChange={(e) => setQ5(e.detail.value!)}
									placeholder="Enter Input"
									onKeyPress={handleKeyPress}
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
							
						</IonSlide>
						
						<IonSlide style={{ display: 'block' }}>
						
								<p style={{paddingTop: '50px'}}>What is the email for the entity?</p>
								<IonInput
									type="email"
									onKeyPress={handleKeyPress}
									value={q6}
									onIonChange={(e) => setQ6(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
			
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>What is the total offering amount of the entity? (can be indefinite) </p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q7}
									onIonChange={(e) => setQ7(e.detail.value!)}
									placeholder="Enter Input"
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>What is the minimum amount invetors can invest? </p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
								
									value={q8}
									onIonChange={(e) => setQ8(e.detail.value!)}
									placeholder="Enter Input"
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
						
								<p style={{paddingTop: '50px'}}>What is the minimum amount the entity must raise to close the offering?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q9}
									onIonChange={(e) => setQ9(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>How much money has already been contributed to the entity? </p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
								
									value={q10}
									onIonChange={(e) => setQ10(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
						
								<p style={{paddingTop: '50px'}}>How many investors have already contributed to the entity?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="number"
									
									value={q11}
									onIonChange={(e) => setQ11(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>What is the name of the general partner/operator?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q12}
									onIonChange={(e) => setQ12(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}> In which state is the general partner/operator registered/residing?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q13}
									onIonChange={(e) => setQ13(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
						
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>
									Who is the registered agent? (Must be person or service in the registration
									state)
								</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q14}
									onIonChange={(e) => setQ14(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>Who is the responsible party? (Must be natural person) </p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q15}
									onIonChange={(e) => setQ15(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>
									What is the responsible party's Social Security Number (Necessary to apply for
									EIN)
								</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
							
									value={q16}
									onIonChange={(e) => setQ16(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
						
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>Will the investors receive 100% of returns until whole?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q17}
									onIonChange={(e) => setQ17(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>Will you offer a preferred return? If so, what are the terms?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q18}
									onIonChange={(e) => setQ18(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
						
								<p style={{paddingTop: '50px'}}>Will you offer a hurdle rate?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q19}
									onIonChange={(e) => setQ19(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>What, if any, is the management fee?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q20}
									onIonChange={(e) => setQ20(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
						
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
						
								<p style={{paddingTop: '50px'}}>What, if any, is the administration fee?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q21}
									onIonChange={(e) => setQ21(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
						
								<p style={{paddingTop: '50px'}}>What, if any, are the other fees?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q22}
									onIonChange={(e) => setQ22(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
						
								<p style={{paddingTop: '50px'}}> What, if any, is the carry interest for the general partner?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									
									value={q23}
									onIonChange={(e) => setQ23(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
								
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							
								<p style={{paddingTop: '50px'}}>Are there any other important terms?</p>
								<IonInput
									onKeyPress={handleKeyPress}
									type="text"
									autofocus = {true}
									value={q24}
									onIonChange={(e) => setQ24(e.detail.value!)}
									placeholder="Enter Input"
									
									style={{ marginBottom: '50px',
									borderBottom: '1px solid #fff', width: '80%', margin: '0 auto', paddingTop: '50px'}}/>
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
						
							
						</IonSlide>
						<IonSlide style={{ display: 'block' }}>
							

						</IonSlide>
					</IonSlides>
					}
					{
						reviewAnswers && 
							<IonRow style={{padding: '10px'}}>
								<h4 style={{textAlign:'center', width:'100%'}}>Please Review Your Answers</h4>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the name of the entity? 
									</div>

									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q1}
										</div>	
									}

									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q1}
											onIonChange={(e) => setQ1(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the entity type? (i.e. limited liability company) 
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q2}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q2}
											onIonChange={(e) => setQ2(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the address of the entity?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q3}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q3}
											onIonChange={(e) => setQ3(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										In which state should the entity be registered? (Delaware default)
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q4}
										</div>	
									}
									{
										editMode &&
										<IonSelect 
										value={q4} 
										onIonChange={(e) => setQ4(e.detail.value!)}
										style={{borderBottom: '1px solid #d7d7d7', width: '80%', margin: '0 auto'}}
										>
											<IonSelectOption value="AL">Alabama</IonSelectOption>
											<IonSelectOption value="AK">Alaska</IonSelectOption>
											<IonSelectOption value="AZ">Arizona</IonSelectOption>
											<IonSelectOption value="AR">Arkansas</IonSelectOption>
											<IonSelectOption value="CA">California</IonSelectOption>
											<IonSelectOption value="CO">Colorado</IonSelectOption>
											<IonSelectOption value="CT">Connecticut</IonSelectOption>
											<IonSelectOption value="DE">Delaware</IonSelectOption>
											<IonSelectOption value="DC">District Of Columbia</IonSelectOption>
											<IonSelectOption value="FL">Florida</IonSelectOption>
											<IonSelectOption value="GA">Georgia</IonSelectOption>
											<IonSelectOption value="HI">Hawaii</IonSelectOption>
											<IonSelectOption value="ID">Idaho</IonSelectOption>
											<IonSelectOption value="IL">Illinois</IonSelectOption>
											<IonSelectOption value="IN">Indiana</IonSelectOption>
											<IonSelectOption value="IA">Iowa</IonSelectOption>
											<IonSelectOption value="KS">Kansas</IonSelectOption>
											<IonSelectOption value="KY">Kentucky</IonSelectOption>
											<IonSelectOption value="LA">Louisiana</IonSelectOption>
											<IonSelectOption value="ME">Maine</IonSelectOption>
											<IonSelectOption value="MD">Maryland</IonSelectOption>
											<IonSelectOption value="MA">Massachusetts</IonSelectOption>
											<IonSelectOption value="MI">Michigan</IonSelectOption>
											<IonSelectOption value="MN">Minnesota</IonSelectOption>
											<IonSelectOption value="MS">Mississippi</IonSelectOption>
											<IonSelectOption value="MO">Missouri</IonSelectOption>
											<IonSelectOption value="MT">Montana</IonSelectOption>
											<IonSelectOption value="NE">Nebraska</IonSelectOption>
											<IonSelectOption value="NV">Nevada</IonSelectOption>
											<IonSelectOption value="NH">New Hampshire</IonSelectOption>
											<IonSelectOption value="NJ">New Jersey</IonSelectOption>
											<IonSelectOption value="NM">New Mexico</IonSelectOption>
											<IonSelectOption value="NY">New York</IonSelectOption>
											<IonSelectOption value="NC">North Carolina</IonSelectOption>
											<IonSelectOption value="ND">North Dakota</IonSelectOption>
											<IonSelectOption value="OH">Ohio</IonSelectOption>
											<IonSelectOption value="OK">Oklahoma</IonSelectOption>
											<IonSelectOption value="OR">Oregon</IonSelectOption>
											<IonSelectOption value="PA">Pennsylvania</IonSelectOption>
											<IonSelectOption value="RI">Rhode Island</IonSelectOption>
											<IonSelectOption value="SC">South Carolina</IonSelectOption>
											<IonSelectOption value="SD">South Dakota</IonSelectOption>
											<IonSelectOption value="TN">Tennessee</IonSelectOption>
											<IonSelectOption value="TX">Texas</IonSelectOption>
											<IonSelectOption value="UT">Utah</IonSelectOption>
											<IonSelectOption value="VT">Vermont</IonSelectOption>
											<IonSelectOption value="VA">Virginia</IonSelectOption>
											<IonSelectOption value="WA">Washington</IonSelectOption>
											<IonSelectOption value="WV">West Virginia</IonSelectOption>
											<IonSelectOption value="WI">Wisconsin</IonSelectOption>
											<IonSelectOption value="WY">Wyoming</IonSelectOption>
										</IonSelect>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the phone number of the entity?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q5}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="number"
											value={q5}
											onIonChange={(e) => setQ5(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the email for the entity?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q6}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="email"
											value={q6}
											onIonChange={(e) => setQ6(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the total offering amount of the entity? (can be indefinite)
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q7}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q7}
											onIonChange={(e) => setQ7(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the minimum amount invetors can invest?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q8}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q8}
											onIonChange={(e) => setQ8(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the minimum amount the entity must raise to close the offering?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q9}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q9}
											onIonChange={(e) => setQ9(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										How much money has already been contributed to the entity?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q10}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q10}
											onIonChange={(e) => setQ10(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										How many investors have already contributed to the entity?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q11}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="number"
											value={q11}
											onIonChange={(e) => setQ11(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the name of the general partner/operator?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q12}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q12}
											onIonChange={(e) => setQ12(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										In which state is the general partner/operator registered/residing?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q13}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q13}
											onIonChange={(e) => setQ13(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										Who is the registered agent? (Must be person or service in the registration state)
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q14}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q14}
											onIonChange={(e) => setQ14(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										Who is the responsible party? (Must be natural person)
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q15}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q15}
											onIonChange={(e) => setQ15(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What is the responsible party's Social Security Number (Necessary to apply for EIN)
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q16}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="number"
											value={q16}
											onIonChange={(e) => setQ16(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										Will the investors receive 100% of returns until whole?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q17}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q17}
											onIonChange={(e) => setQ17(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										Will you offer a preferred return? If so, what are the terms?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q18}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q18}
											onIonChange={(e) => setQ18(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										Will you offer a hurdle rate?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q19}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q19}
											onIonChange={(e) => setQ19(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What, if any, is the management fee?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q20}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q20}
											onIonChange={(e) => setQ20(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What, if any, is the administration fee?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q21}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q21}
											onIonChange={(e) => setQ21(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What, if any, are the other fees?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q22}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q22}
											onIonChange={(e) => setQ22(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										What, if any, is the carry interest for the general partner?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q23}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q23}
											onIonChange={(e) => setQ23(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div className="div-row b-bottom">
									<div className="div-label">
										Are there any other important terms?
									</div>
									{
										reviewMode && 
										<div onClick={() => { setEditMode(true); setReviewMode(false); }}>
											{q24}
										</div>	
									}
									{
										editMode &&
										<div>
											<IonInput
											type="text"
											value={q24}
											onIonChange={(e) => setQ24(e.detail.value!)}
											placeholder="Enter Input"/>
										</div>
									}
								</div>
								<div>
									<IonItem className="cert">
										<IonLabel style={{display: 'block', whiteSpace: 'normal'}}>
											I hereby certify that the above statements are true and correct to the best of
											my knowledge
										</IonLabel>
										<IonCheckbox slot="start"  onIonChange={() => setAgree(!agree)}/>
									</IonItem>
									<IonButton
										type="submit"
										id = 'submit_button'
										ref ={myBox}
										className="ion-margin-top"
										expand="block"
										onClick={handleSubmit}
										disabled = {!agree}
										style={{
											width: '30%',
											margin: '0 auto',
											marginBottom: '40px',
											color: '#000'
										}}
									>
										Submit
									</IonButton>
								</div>
							</IonRow>	
					}
					{ !reviewAnswers && 
						<div className="slide-buttons">
							<IonButton disabled={disablePrevBtn} onClick={() => onBtnClicked("prev")}>
								<IonIcon icon={arrowBackOutline} style={{ position: 'relative', top: '3px' }} />
							</IonButton>
							<IonButton disabled={disableNextBtn} onClick={() => onBtnClicked("next")}>
								<IonIcon icon={arrowForwardOutline} style={{ position: 'relative', top: '3px' }} />
							</IonButton>
						</div>
					}
				</div>
			</IonContent>
		
			<Footer />
		</IonPage>
	);
};

export default Questions;


