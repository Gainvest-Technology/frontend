"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var react_router_1 = require("react-router");
var Intro = function (props) {
    var history = react_router_1.useHistory();
    var _a = react_1.useState(), firstName = _a[0], setFirstName = _a[1];
    var _b = react_1.useState(), lastName = _b[0], setLastName = _b[1];
    var _c = react_1.useState(), email = _c[0], setEmail = _c[1];
    var _d = react_1.useState(), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(), confirmPassword = _e[0], setConfirmPassword = _e[1];
    var _f = react_1.useState(false), iserror = _f[0], setIserror = _f[1];
    var _g = react_1.useState(false), accountCreated = _g[0], setAccountCreated = _g[1];
    var _h = react_1.useState(''), message = _h[0], setMessage = _h[1];
    var _j = react_1.useState({}), userData = _j[0], setUserData = _j[1];
    react_1.useEffect(function () {
        if (props.location.state) {
            setUserData({
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
    function goHome() {
        history.push({
            pathname: '/dashboard',
            state: {
                data: userData
            }
        });
    }
    return (react_1["default"].createElement(react_2.IonPage, null,
        react_1["default"].createElement(react_2.IonContent, { fullscreen: true },
            react_1["default"].createElement("video", { id: "myVideo", width: "100%", height: "100%", autoPlay: true, onEnded: goHome },
                react_1["default"].createElement("source", { src: "https://gainvestco.s3.us-east-2.amazonaws.com/IntroGainvest.m4v", type: "video/mp4" }),
                "Your browser does not support HTML5 video."))));
};
exports["default"] = Intro;
