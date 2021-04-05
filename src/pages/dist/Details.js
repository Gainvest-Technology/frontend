"use strict";
exports.__esModule = true;
var react_1 = require("@ionic/react");
var react_2 = require("react");
var Header_1 = require("../components/Header");
var axios_1 = require("axios");
var react_router_dom_1 = require("react-router-dom");
var icons_1 = require("ionicons/icons");
var async_1 = require("async");
var Details = function (props) {
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
    var _a = react_2.useState({
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
    }), pageData = _a[0], setPageData = _a[1];
    var history = react_router_dom_1.useHistory();
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();
    //const startDate = mm + '/' + dd + '/' + yyyy;
    //const user = useContext(UserContext);
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
    function changeContent(fund) {
        // if (pageContent) {
        var capital = [];
        var documents = [];
        var fund_shares = [];
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
        });
        //}       
    }
    function getCapital(id, callback) {
        var api = axios_1["default"].create({
            //baseURL: 'http://localhost:3000'
            baseURL: 'https://gainvest-api.com'
        });
        api.get("/capitals/investor/" + id)
            .then(function (response) {
            var total_funds = {};
            response.data.map(function (item) {
                if (item.fund_name) {
                    if (total_funds[item.fund_name]) {
                        if (total_funds[item.fund_name]['capital']) {
                            total_funds[item.fund_name]['capital'].push({
                                fund_name: item.fund_name,
                                capital_transfer_amount: item.capital_transfer_amount,
                                date: item.date
                            });
                        }
                        else {
                            total_funds[item.fund_name]['capital'] = [];
                            total_funds[item.fund_name]['capital'].push({
                                fund_name: item.fund_name,
                                capital_transfer_amount: item.capital_transfer_amount,
                                date: item.date
                            });
                        }
                    }
                    else {
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
    function getFundShares(total_funds, id, callback) {
        var api = axios_1["default"].create({
            //baseURL: 'http://localhost:3000'
            baseURL: 'https://gainvest-api.com'
        });
        api.get("/documents/investor/" + id)
            .then(function (response) {
            response.data.map(function (item) {
                if (item.fund_name) {
                    if (total_funds[item.fund_name]) {
                        if (total_funds[item.fund_name]['documents']) {
                            total_funds[item.fund_name]['documents'].push({
                                type: item.type,
                                document_url: item.document_url
                            });
                        }
                        else {
                            total_funds[item.fund_name]['documents'] = [];
                            total_funds[item.fund_name]['documents'].push({
                                type: item.type,
                                document_url: item.document_url
                            });
                        }
                    }
                    else {
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
    function getDocuments(total_funds, id, callback) {
        var api = axios_1["default"].create({
            //baseURL: 'http://localhost:3000'
            baseURL: 'https://gainvest-api.com'
        });
        api.get("/fund-shares/investor/" + id)
            .then(function (response) {
            response.data.map(function (item) {
                if (item.fund_name) {
                    if (total_funds[item.fund_name]) {
                        if (total_funds[item.fund_name]['fund_shares']) {
                            total_funds[item.fund_name]['documents'].push({
                                date: item.date,
                                num_of_shares_purchased: item.num_of_shares_purchased,
                                investment_amount: item.investment_amount
                            });
                        }
                        else {
                            total_funds[item.fund_name]['fund_shares'] = [];
                            total_funds[item.fund_name]['fund_shares'].push({
                                date: item.date,
                                num_of_shares_purchased: item.num_of_shares_purchased,
                                investment_amount: item.investment_amount
                            });
                        }
                    }
                    else {
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
    react_2.useEffect(function () {
        if (props.location.state) {
            var firstName = props.location.state.data.firstName;
            var lastName = props.location.state.data.lastName;
            var id = props.location.state.data.id;
            //const name = "Andre Harewood";
            async_1["default"].waterfall([
                async_1["default"].constant(id),
                getCapital,
                getFundShares,
                getDocuments,
            ], function (err, result) {
                var fund_names = [];
                var investor_info = [];
                for (var _i = 0, _a = Object.entries(result); _i < _a.length; _i++) {
                    var _b = _a[_i], key = _b[0], value = _b[1];
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
    }, [props]);
    return (react_2["default"].createElement(react_1.IonPage, null,
        react_2["default"].createElement(Header_1.Header, null),
        react_2["default"].createElement(react_1.IonContent, { className: "light" },
            react_2["default"].createElement("h1", { style: { textAlign: 'center', marginBottom: '30px' } }, "Your Portfolio"),
            react_2["default"].createElement(react_1.IonList, { className: "docs-list" },
                react_2["default"].createElement(react_1.IonListHeader, null, "Legal")),
            react_2["default"].createElement(react_1.IonList, { className: "docs-list" },
                react_2["default"].createElement(react_1.IonListHeader, null, "Finance")),
            react_2["default"].createElement(react_1.IonList, { className: "docs-list" },
                react_2["default"].createElement(react_1.IonListHeader, null, "Accounting")),
            react_2["default"].createElement(react_1.IonItem, { className: "select-label", style: { marginBottom: '30px' } },
                react_2["default"].createElement(react_1.IonLabel, { className: "select-label" }, "My Funds"),
                react_2["default"].createElement(react_1.IonSelect, { onIonChange: function (e) { return changeContent(e.detail.value); }, className: "select-label", interface: "popover" }, pageData.fundNames &&
                    pageData.fundNames.map(function (val, index) {
                        return react_2["default"].createElement(react_1.IonSelectOption, { className: "select-label", value: val }, val);
                    }))),
            pageData.showDetails &&
                react_2["default"].createElement(react_1.IonList, { className: 'bg-and-text' },
                    react_2["default"].createElement(react_1.IonListHeader, { className: "list-header" }, "Capital"),
                    pageData.capital.map(function (val, index) {
                        var key = val.date + val.capital_transfer_amount + index;
                        return react_2["default"].createElement(react_1.IonItem, { key: key, className: "portfolio-item bg-and-text" },
                            react_2["default"].createElement("div", { key: key }, val.date),
                            react_2["default"].createElement("div", { key: key, className: "text-align-right" }, val.capital_transfer_amount));
                    }),
                    react_2["default"].createElement(react_1.IonListHeader, { className: "list-header" }, "Fund Shares"),
                    pageData.fund_shares.map(function (val, index) {
                        var key = val.date + val.num_of_shares_purchased + val.investment_amount + index;
                        return react_2["default"].createElement(react_1.IonItem, { key: key, className: "portfolio-item bg-and-text" },
                            react_2["default"].createElement("div", { key: key }, val.date),
                            react_2["default"].createElement("div", { key: key },
                                val.num_of_shares_purchased,
                                " Shares"),
                            react_2["default"].createElement("div", { key: key, className: "text-align-right" }, val.investment_amount));
                    }),
                    react_2["default"].createElement(react_1.IonListHeader, { className: "list-header" }, "Documents"),
                    pageData.documents.map(function (val, index) {
                        var key = val.date + val.type + val.investment_amount + val.document_url + index;
                        return react_2["default"].createElement(react_1.IonItem, { className: "portfolio-item bg-and-text" },
                            react_2["default"].createElement("div", { key: key }, val.type),
                            react_2["default"].createElement("div", { key: key, className: "text-align-right" },
                                react_2["default"].createElement("a", { key: key, className: "anchor-button", href: val.document_url }, "View")));
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
                react_2["default"].createElement(react_1.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/menu'); } },
                    react_2["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_2["default"].createElement(react_1.IonIcon, { style: { flex: '1' }, icon: icons_1.gridOutline })),
                    react_2["default"].createElement(react_1.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Menu"))))));
};
exports["default"] = Details;
