"use strict";
exports.__esModule = true;
var react_1 = require("@ionic/react");
var react_2 = require("react");
var Header_1 = require("../components/Header");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var icons_1 = require("ionicons/icons");
var Dashboard = function (props) {
    var history = react_router_dom_1.useHistory();
    // const [ capital, setCapital ] = useState<number>(0.00);
    // const [ fundCount, setFundCount ] = useState<number>(0);
    // const [ investorName, setInvestorName ] = useState<string>('');
    // const [ avatar, setAvatar ] = useState<string>('');
    // const [ userData, setUserData ] = useState<any>({});
    // const [ allFunds, setAllFunds ] = useState<any>();
    var _a = react_2.useState({
        token: '',
        chatToken: '',
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        chatApiKey: '',
        chatId: '',
        activeFunds: []
    }), pageData = _a[0], setPageData = _a[1];
    react_2.useEffect(function () {
        if (props.location.state) {
            var api = axios_1["default"].create({
                baseURL: 'https://gainvest-api.com'
                //baseURL: 'http://localhost:3000'
            });
            api.get("/funds").then(function (response) {
                var data = response.data;
                function checkActive(fund) {
                    if (fund.status === 'Active' || fund.status === 'Open') {
                        return true;
                    }
                    else {
                        return false;
                    }
                }
                var activeFunds = data.filter(checkActive);
                setPageData({
                    token: props.location.state.data.token,
                    chatToken: props.location.state.data.chatToken,
                    firstName: props.location.state.data.firstName,
                    lastName: props.location.state.data.lastName,
                    email: props.location.state.data.email,
                    id: props.location.state.data.id,
                    chatApiKey: props.location.state.data.chatApiKey,
                    chatId: props.location.state.data.chatId,
                    activeFunds: activeFunds
                });
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
            react_2["default"].createElement("h1", { className: "h1" }, "Available Funds"),
            react_2["default"].createElement(react_1.IonGrid, null, pageData.activeFunds.map(function (fund, index) {
                var key = fund.name + index;
                return (react_2["default"].createElement(react_1.IonRow, { key: "fund-container" + index, className: "fund-container box-shadow" },
                    react_2["default"].createElement(react_1.IonRow, { key: "fund-header" + index, style: { width: '100%' }, className: "fund-header" },
                        react_2["default"].createElement(react_1.IonCol, { key: "innerCol" + index }, fund.name)),
                    react_2["default"].createElement(react_1.IonRow, { key: "1fund-row" + index, style: { width: '100%' }, className: "fund-row" },
                        react_2["default"].createElement(react_1.IonCol, { key: "startDateCol" + index },
                            react_2["default"].createElement("div", { key: "1startDateDiv" + index, style: { textDecoration: 'underline', marginBottom: '5px' } }, "Start Date"),
                            react_2["default"].createElement("div", { key: "2startDateDiv" + index, style: { fontWeight: 'bold' } }, fund.start_date)),
                        react_2["default"].createElement(react_1.IonCol, { key: "fundSizeCol" + index },
                            react_2["default"].createElement("div", { key: "1fundSizeDiv" + index, style: { textDecoration: 'underline', marginBottom: '5px' } }, "Total Fund Size"),
                            react_2["default"].createElement("div", { key: "2fundSizeDiv" + index, style: { fontWeight: 'bold' } }, fund.total_fund_size)),
                        ";"),
                    react_2["default"].createElement(react_1.IonRow, { key: "2fund-row" + index, style: { width: '100%' }, className: "fund-row" },
                        react_2["default"].createElement(react_1.IonCol, { key: "learnMoreCol" + index },
                            react_2["default"].createElement("a", { key: "learnMoreAnc" + index, className: "learn-more", href: fund.description }, "Learn More")),
                        react_2["default"].createElement(react_1.IonCol, { key: "investCol" + index },
                            react_2["default"].createElement("a", { key: "investAnc" + index, className: "invest", href: fund.invest_rich }, "Invest")))));
            }))),
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
