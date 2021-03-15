import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import { Menu } from './components/Menu';
//import Home from './pages/Home';
import Portal from './pages/Portal';
import SignUp from './pages/SignUp';
import Chat from './pages/Chat';
import ForgotPassword from './pages/ForgotPass';
import Profile from './pages/Profile';
import Intro from './pages/Intro';
import Dashboard from './pages/Dashboard';
import Details from './pages/Details';
import Funds from './pages/Funds';
import { Loader } from './components/Loader';
// import { UserContext } from './contexts/UserContext'

import LogRocket from 'logrocket';
LogRocket.init('bak3sl/gainvest2');

const App: React.FC = () => (
	// <UserContext.Provider value={UserInfo}>
	<IonApp>
		<IonReactRouter>
			<IonRouterOutlet id="main">
				<Route path="/" component={Portal} exact={true} />
				<Route path="/chat" component={Chat} exact={true} />
				{/* <Route path="/home" component={Home} exact={true} /> */}
				<Route path="/dashboard" component={Dashboard} exact={true} />
				<Route path="/signup" component={SignUp} exact={true} />
				{/* <Route path="/forgotpass" component={ForgotPassword} exact={true} />
					<Route path="/profile" component={Profile} exact={true} /> */}
				<Route path="/intro" component={Intro} exact={true} />
				<Route path="/documents" component={Details} exact={true} />
				<Route path="/funds" component={Funds} exact={true} />
				<Route render={() => <Redirect to="/" />} />
			</IonRouterOutlet>
		</IonReactRouter>
	</IonApp>
	// </UserContext.Provider>
	// 	<userContext.Consumer>
	//     {({user, logoutUser}) => {
	//       return (
	//         <Avatar user={user}/>
	//         <LogoutButton onClick={logoutUser}/>
	//       );
	//     }}
	//   </userContext.Consumer>
	// <IonApp>
	// 	<UserContext.Provider value={
	// 		{
	// 			token: '',
	// 			firstName: '',
	// 			lastName: '',
	// 			email: '',
	// 			id: '',
	// 			chatToken: '',
	// 			chatApiKey: '',
	// 			chatId: '',
	// 			isLoggedIn: false
	// 		}
	// 	}>
	// 		<IonReactRouter>
	// 			<IonTabs>
	// 				<IonRouterOutlet id="main">
	// 					<Route exact path="/">
	// 						<Portal />
	// 					</Route>
	// 					<Route exact path="/dashboard">
	// 						<Dashboard />
	// 					</Route>
	// 					<Route exact path="/chat">
	// 						<Chat />
	// 					</Route>
	// 					<Route path="/details">
	// 						<Details />
	// 					</Route>
	// 					{/* <Route exact path="/">
	// 						<Redirect to="/tab1" />
	// 					</Route> */}
	// 				</IonRouterOutlet>
	// 				<IonTabBar slot="bottom" className="tabby">
	// 					<IonTabButton tab="tab1" href="/dashboard">
	// 						<IonIcon icon={homeSharp} />
	// 						<IonLabel>Home</IonLabel>
	// 					</IonTabButton>
	// 					<IonTabButton tab="tab2" href="/chat">
	// 						<IonIcon icon={chatboxEllipsesSharp} />
	// 						<IonLabel>Chat</IonLabel>
	// 					</IonTabButton>
	// 					<IonTabButton tab="tab3" href="/details">
	// 						<IonIcon icon={documentsSharp} />
	// 						<IonLabel>Portfolio</IonLabel>
	// 					</IonTabButton>
	// 					<IonTabButton tab="tab4" href="/all-funds">
	// 						<IonIcon icon={businessSharp} />
	// 						<IonLabel>Funds</IonLabel>
	// 					</IonTabButton>
	// 				</IonTabBar>
	// 			</IonTabs>
	// 		</IonReactRouter>
	// 	</UserContext.Provider>
	// </IonApp>
);

export default App;
