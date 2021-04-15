"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_router_dom_1 = require("react-router-dom");
var react_2 = require("@ionic/react");
var react_router_1 = require("@ionic/react-router");
/* Core CSS required for Ionic components to work properly */
require("@ionic/react/css/core.css");
/* Basic CSS for apps built with Ionic */
require("@ionic/react/css/normalize.css");
require("@ionic/react/css/structure.css");
require("@ionic/react/css/typography.css");
/* Optional CSS utils that can be commented out */
require("@ionic/react/css/padding.css");
require("@ionic/react/css/float-elements.css");
require("@ionic/react/css/text-alignment.css");
require("@ionic/react/css/text-transformation.css");
require("@ionic/react/css/flex-utils.css");
require("@ionic/react/css/display.css");
require("./assets/gainvest.css");
/* Theme variables */
require("./theme/variables.css");
var Portal_1 = require("./pages/Portal");
var SignUp_1 = require("./pages/SignUp");
var Chat_1 = require("./pages/Chat");
var Intro_1 = require("./pages/Intro");
var Dashboard_1 = require("./pages/Dashboard");
var Details_1 = require("./pages/Details");
var Funds_1 = require("./pages/Funds");
var NewPassword_1 = require("./pages/NewPassword");
var Menu_1 = require("./pages/Menu");
// import { UserContext } from './contexts/UserContext'
// import LogRocket from 'logrocket';
// LogRocket.init('bak3sl/gainvest2');
var App = function () { return (
// <UserContext.Provider value={UserInfo}>
react_1["default"].createElement(react_2.IonApp, null,
    react_1["default"].createElement(react_router_1.IonReactRouter, null,
        react_1["default"].createElement(react_2.IonRouterOutlet, { id: "main" },
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/", component: Portal_1["default"], exact: true }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/chat", component: Chat_1["default"], exact: true }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/dashboard", component: Dashboard_1["default"], exact: true }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/signup", component: SignUp_1["default"], exact: true }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/intro", component: Intro_1["default"], exact: true }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/documents", component: Details_1["default"], exact: true }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/funds", component: Funds_1["default"], exact: true }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/new_password", component: NewPassword_1["default"], exact: true }),
            react_1["default"].createElement(react_router_dom_1.Route, { path: "/menu", component: Menu_1["default"], exact: true }),
            react_1["default"].createElement(react_router_dom_1.Route, { render: function () { return react_1["default"].createElement(react_router_dom_1.Redirect, { to: "/" }); } }))))
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
); };
exports["default"] = App;
