"use strict";
exports.__esModule = true;
var react_1 = require("@ionic/react");
var react_2 = require("react");
var Header_1 = require("../components/Header");
var react_router_dom_1 = require("react-router-dom");
var icons_1 = require("ionicons/icons");
var Menu = function (props) {
    var history = react_router_dom_1.useHistory();
    var _a = react_2.useState({
        token: '',
        chatToken: '',
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        chatApiKey: '',
        chatId: ''
    }), pageData = _a[0], setPageData = _a[1];
    react_2.useEffect(function () {
        if (props.location.state) {
            setPageData({
                token: props.location.state.data.token,
                chatToken: props.location.state.data.chatToken,
                firstName: props.location.state.data.firstName,
                lastName: props.location.state.data.lastName,
                email: props.location.state.data.email,
                id: props.location.state.data.id,
                chatApiKey: props.location.state.data.chatApiKey,
                chatId: props.location.state.data.chatId
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
            react_2["default"].createElement(react_1.IonList, { className: "menu-page" },
                react_2["default"].createElement(react_1.IonItem, { button: true, detail: true, onClick: function () { navigate('/dashboard'); } },
                    react_2["default"].createElement(react_1.IonLabel, null, "Merch - (Coming Soon)")),
                react_2["default"].createElement(react_1.IonItem, { button: true, detail: true, onClick: function () { navigate('/dashboard'); } },
                    react_2["default"].createElement(react_1.IonLabel, null, "Schedule A Consult")),
                react_2["default"].createElement(react_1.IonItem, { button: true, detail: true, onClick: function () { navigate('/dashboard'); } },
                    react_2["default"].createElement(react_1.IonLabel, null, "Fundraising Package")),
                react_2["default"].createElement(react_1.IonItem, { button: true, detail: true, onClick: function () { navigate('/dashboard'); } },
                    react_2["default"].createElement(react_1.IonLabel, null, "Deal/Contract Review")),
                react_2["default"].createElement(react_1.IonItem, { button: true, detail: true, onClick: function () { navigate('/dashboard'); } },
                    react_2["default"].createElement(react_1.IonLabel, null, "Formation - Form LLC or Corporation")),
                react_2["default"].createElement(react_1.IonItem, { button: true, detail: true, onClick: function () { navigate('/dashboard'); } },
                    react_2["default"].createElement(react_1.IonLabel, null, "Contract Drafting")),
                react_2["default"].createElement(react_1.IonItem, { button: true, detail: true, onClick: function () { navigate('/funds'); } },
                    react_2["default"].createElement(react_1.IonLabel, null, "View All Funds")))),
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
exports["default"] = Menu;
