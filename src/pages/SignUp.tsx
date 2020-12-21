import React, { useState } from 'react';
import {
	IonContent,
	IonHeader,
	IonPage,
	IonTitle,
	IonToolbar,
	IonButton,
	IonText,
	IonItem,
	IonLabel,
	IonInput,
	IonCheckbox,
	IonFooter
} from '@ionic/react';
import { useForm } from 'react-hook-form';
import { NavButtons } from '../components/NavButtons';
import { object, string } from 'yup';
import Input, { InputProps } from '../components/Input';

const SignUp: React.FC = () => {
	const [ email, setEmail ] = useState<string>();
	const [ password, setPassword ] = useState<string>();

	const validationSchema = object().shape({
		email: string().required().email(),
		firstName: string().required().min(5).max(32),
		lastName: string().required().min(5).max(32),
		password: string().required().min(8)
	});

	const { control, handleSubmit, errors } = useForm({
		validationSchema
	});

	const formFields: InputProps[] = [
		{
			name: 'firstName',
			component: <IonInput type="text" />,
			label: 'First Name'
		},
		{
			name: 'lastName',
			component: <IonInput type="text" />,
			label: 'Last Name'
		},
		{
			name: 'email',
			component: <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} />,
			label: 'Email'
		},
		{
			name: 'password',
			component: (
				<IonInput
					type="password"
					value={password}
					onIonChange={(e) => setPassword(e.detail.value!)}
					clearOnEdit={false}
				/>
			),
			label: 'Password'
		}
	];

	const registerUser = (data: any) => {
		console.log('creating a new user account with: ', data);
	};

	return (
		<IonPage>
			<IonHeader>
				<IonToolbar color="dark">
					<IonTitle style={{ textAlign: 'center' }}>Sign Up</IonTitle>
					<IonButton slot="end">
						<NavButtons />
					</IonButton>
				</IonToolbar>
			</IonHeader>
			<IonContent fullscreen>
				<div className="ion-padding">
					<IonText color="muted">
						<h2>Create Account</h2>
					</IonText>
					<form onSubmit={handleSubmit(registerUser)}>
						{formFields.map((field, index) => (
							<Input {...field} control={control} key={index} errors={errors} />
						))}
						<IonItem>
							<IonLabel>I agree to the terms of service</IonLabel>
							<IonCheckbox slot="start" />
						</IonItem>
						<IonButton expand="block" type="submit" className="ion-margin-top">
							Register
						</IonButton>
					</form>
				</div>
			</IonContent>
			<IonFooter>
				<IonToolbar color="dark">
					<p style={{ fontSize: 'medium', textAlign: 'center' }}>Gainvest Holdings LLC</p>
				</IonToolbar>
			</IonFooter>
		</IonPage>
	);
};

export default SignUp;
