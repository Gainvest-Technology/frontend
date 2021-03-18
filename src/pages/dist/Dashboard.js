"use strict";
exports.__esModule = true;
var react_1 = require("@ionic/react");
var react_2 = require("react");
var icons_1 = require("ionicons/icons");
var Header_1 = require("../components/Header");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var Dashboard = function (props) {
    var history = react_router_dom_1.useHistory();
    //const [ startDate, setStartDate ] = useState<any>(undefined);
    var _a = react_2.useState(''), investorName = _a[0], setInvestorName = _a[1];
    var _b = react_2.useState(''), avatar = _b[0], setAvatar = _b[1];
    var _c = react_2.useState({}), userData = _c[0], setUserData = _c[1];
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();
    var startDate = mm + '/' + dd + '/' + yyyy;
    // const user = useContext(UserContext);
    var _d = react_2.useState({
        token: '',
        chatToken: '',
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        chatApiKey: '',
        chatId: '',
        avatar: '',
        capitalAmount: 0.00,
        fundCount: 0,
        fundNames: [],
        investorData: {},
        capital: [],
        fund_shares: [],
        documents: [],
        showDetails: false,
        activeFunds: []
    }), pageData = _d[0], setPageData = _d[1];
    react_2.useEffect(function () {
        if (props.location.state) {
            var firstName_1 = props.location.state.data.firstName;
            var lastName = props.location.state.data.lastName;
            var name = firstName_1 + ' ' + lastName;
            var chatId = props.location.state.data.chatId;
            var token = props.location.state.data.chatToken;
            var chatApiKey = props.location.state.data.chatApiKey;
            setAvatar('https://getstream.io/random_svg/?name=' + firstName_1);
            var investor = firstName_1 + ' ' + lastName;
            //const investor = 'Andre Harewood';
            var api = axios_1["default"].create({
                baseURL: 'https://gainvest-api.com'
                //baseURL: 'http://localhost:3000'
            });
            api.get("/capitals/investor/" + investor).then(function (response) {
                var total_amount = 0.0;
                var total_funds = [];
                response.data.map(function (item) {
                    var raw_amount = item.capital_transfer_amount.replace('$', '').replace(',', '');
                    total_amount += parseFloat(raw_amount);
                    if (total_funds.indexOf(item.fund_name < 0)) {
                        total_funds.push(item.fund_name);
                    }
                });
                var formattedCapital = total_amount.toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
                setPageData({
                    token: props.location.state.data.token,
                    chatToken: props.location.state.data.chatToken,
                    firstName: props.location.state.data.firstName,
                    lastName: props.location.state.data.lastName,
                    email: props.location.state.data.email,
                    id: props.location.state.data.id,
                    chatApiKey: props.location.state.data.chatApiKey,
                    chatId: props.location.state.data.chatId,
                    avatar: 'https://getstream.io/random_svg/?name=' + firstName_1,
                    capitalAmount: formattedCapital,
                    fundCount: total_funds.length
                });
            })["catch"](function (error) {
            });
        }
    }, [props]);
    function navigate(route) {
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
    return (react_2["default"].createElement(react_1.IonPage, null,
        react_2["default"].createElement(Header_1.Header, null),
        react_2["default"].createElement(react_1.IonContent, { className: "light" },
            react_2["default"].createElement("h1", { className: "h1" }, "Gainvestor Snapshot"),
            react_2["default"].createElement(react_1.IonGrid, null,
                react_2["default"].createElement(react_1.IonRow, { className: 'box-shadow', style: { margin: '0px 20px 20px 20px' } },
                    react_2["default"].createElement(react_1.IonCol, null,
                        react_2["default"].createElement("div", { className: "flex-container", style: { height: '100px', margin: '20px', alignItems: 'center' } },
                            react_2["default"].createElement(react_1.IonAvatar, { style: { flex: '1', height: '80px', maxWidth: '80px' } },
                                react_2["default"].createElement("img", { src: pageData.avatar })),
                            react_2["default"].createElement("div", { className: "banner", style: { flex: '3', marginLeft: '20px' } },
                                react_2["default"].createElement("h3", null, pageData.firstName + ' ' + pageData.lastName),
                                react_2["default"].createElement("h5", null, pageData.email))),
                        react_2["default"].createElement("div", { className: "flex-container" },
                            react_2["default"].createElement("div", { className: "flex-child" },
                                react_2["default"].createElement(react_1.IonCard, { className: "card" },
                                    react_2["default"].createElement(react_1.IonCardHeader, { className: "card-header", style: { background: '#ff0000' } }, "0"),
                                    react_2["default"].createElement(react_1.IonCardContent, { className: "card-content" }, "Gainvest Score"))),
                            react_2["default"].createElement("div", { className: "flex-child" },
                                react_2["default"].createElement(react_1.IonCard, { className: "card" },
                                    react_2["default"].createElement(react_1.IonCardHeader, { className: "level" }, "Beginner"),
                                    react_2["default"].createElement(react_1.IonCardContent, { className: "card-content" }, "Gainvestor Level")))))),
                react_2["default"].createElement(react_1.IonRow, null,
                    react_2["default"].createElement(react_1.IonCol, { className: 'stat-container' },
                        react_2["default"].createElement("div", { className: 'stat-header' },
                            react_2["default"].createElement(react_1.IonIcon, { icon: icons_1.logoUsd, style: { position: 'relative', top: '3px' } }),
                            pageData.capitalAmount),
                        react_2["default"].createElement("div", { className: 'stat-label' }, "Total Amount Invested")),
                    react_2["default"].createElement(react_1.IonCol, { className: 'stat-container' },
                        react_2["default"].createElement("div", { className: 'stat-header' },
                            react_2["default"].createElement(react_1.IonIcon, { icon: icons_1.businessSharp, style: { position: 'relative', top: '2px', left: '-5px' } }),
                            pageData.fundCount),
                        react_2["default"].createElement("div", { className: 'stat-label' }, "Total Funds Invested"))),
                react_2["default"].createElement(react_1.IonRow, null,
                    react_2["default"].createElement(react_1.IonCol, { className: 'stat-container' },
                        react_2["default"].createElement("div", { className: 'stat-header' },
                            react_2["default"].createElement(react_1.IonIcon, { icon: icons_1.peopleSharp, style: { position: 'relative', top: '3px', left: '-5px' } }),
                            "0"),
                        react_2["default"].createElement("div", { className: 'stat-label' }, "Gainvestor Interactions")),
                    react_2["default"].createElement(react_1.IonCol, { className: 'stat-container' },
                        react_2["default"].createElement("div", { className: 'stat-header' },
                            react_2["default"].createElement(react_1.IonIcon, { icon: icons_1.calendarSharp, style: { position: 'relative', top: '3px', left: '-5px' } }),
                            "1"),
                        react_2["default"].createElement("div", { className: 'stat-label' }, "Days As A Gainvestor"))))),
        react_2["default"].createElement(react_1.IonToolbar, { slot: "bottom", className: "menu-tabs" },
            react_2["default"].createElement(react_1.IonRow, null,
                react_2["default"].createElement(react_1.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/dashboard'); } },
                    react_2["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_2["default"].createElement(react_1.IonIcon, { style: { flex: '1' }, icon: icons_1.homeSharp })),
                    react_2["default"].createElement(react_1.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Home")),
                react_2["default"].createElement(react_1.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/chat'); } },
                    react_2["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_2["default"].createElement(react_1.IonIcon, { style: { flex: '1' }, icon: icons_1.chatboxEllipsesSharp })),
                    react_2["default"].createElement(react_1.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Chat")),
                react_2["default"].createElement(react_1.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/documents'); } },
                    react_2["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_2["default"].createElement(react_1.IonIcon, { style: { flex: '1' }, icon: icons_1.documentsSharp })),
                    react_2["default"].createElement(react_1.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Portfolio")),
                react_2["default"].createElement(react_1.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/funds'); } },
                    react_2["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_2["default"].createElement(react_1.IonIcon, { style: { flex: '1' }, icon: icons_1.businessSharp })),
                    react_2["default"].createElement(react_1.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Funds"))))));
};
exports["default"] = Dashboard;
