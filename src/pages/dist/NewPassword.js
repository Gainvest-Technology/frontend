"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var react_1 = require("react");
var react_2 = require("@ionic/react");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var NewPassword = function (props) {
    var history = react_router_dom_1.useHistory();
    var _a = react_1.useState(), firstName = _a[0], setFirstName = _a[1];
    var _b = react_1.useState(), lastName = _b[0], setLastName = _b[1];
    var _c = react_1.useState(), email = _c[0], setEmail = _c[1];
    var _d = react_1.useState(), password = _d[0], setPassword = _d[1];
    var _e = react_1.useState(), confirmPassword = _e[0], setConfirmPassword = _e[1];
    var _f = react_1.useState(false), iserror = _f[0], setIserror = _f[1];
    var _g = react_1.useState(false), accountCreated = _g[0], setAccountCreated = _g[1];
    var _h = react_1.useState(''), message = _h[0], setMessage = _h[1];
    var _j = react_1.useState({}), userData = _j[0], setUserData = _j[1];
    var handleUpdate = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var signUpData, api;
        return __generator(this, function (_a) {
            if (!password) {
                setMessage('Please enter your password');
                setIserror(true);
                return [2 /*return*/];
            }
            if (password !== confirmPassword) {
                setMessage('Passwords Do Not Match');
                setIserror(true);
                return [2 /*return*/];
            }
            signUpData = {
                email: props.location.state.data.email,
                password: password
            };
            api = axios_1["default"].create({
                //baseURL: 'http://localhost:3000/'
                baseURL: 'https://gainvest-api.com'
            });
            api
                .post('/users/update_password', signUpData)
                .then(function (response) {
                setUserData({
                    token: response.data.token,
                    chatToken: response.data.chatToken,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,
                    email: response.data.email,
                    id: response.data.id,
                    chatApiKey: response.data.chatApiKey,
                    chatId: response.data.chatId
                });
                setMessage('Password Changed Successfully');
                setAccountCreated(true);
            })["catch"](function (error) {
                setMessage(error);
                setIserror(true);
            });
            return [2 /*return*/];
        });
    }); };
    function goToIntro() {
        history.push({
            pathname: '/intro',
            state: {
                data: userData
            }
        });
    }
    return (react_1["default"].createElement(react_2.IonPage, null,
        react_1["default"].createElement(react_2.IonContent, { "class": "space-bg", fullscreen: true },
            react_1["default"].createElement(react_2.IonRow, null,
                react_1["default"].createElement(react_2.IonCol, null,
                    react_1["default"].createElement(react_2.IonAlert, { isOpen: iserror, onDidDismiss: function () { return setIserror(false); }, cssClass: "my-custom-class", header: 'Error!', message: message, buttons: ['Dismiss'] }))),
            react_1["default"].createElement(react_2.IonRow, null,
                react_1["default"].createElement(react_2.IonCol, null,
                    react_1["default"].createElement(react_2.IonAlert, { isOpen: accountCreated, onDidDismiss: function () { return goToIntro(); }, cssClass: "my-custom-class", header: 'Success!', message: message, buttons: ['Ok'] }))),
            react_1["default"].createElement(react_2.IonRow, null,
                react_1["default"].createElement(react_2.IonCol, { "class": "logo-container" },
                    react_1["default"].createElement(react_2.IonImg, { "class": "logo", src: 'https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png' }))),
            react_1["default"].createElement("form", { className: "ion-padding form" },
                react_1["default"].createElement("h2", { style: { color: '#212326', textAlign: 'center' } }, "Welcome Back!"),
                react_1["default"].createElement("p", { style: { color: '#212326', textAlign: 'center' } }, "Please Confirm Your Password For The New Gainvest Experience "),
                react_1["default"].createElement(react_2.IonItem, { "class": "login-input" },
                    react_1["default"].createElement(react_2.IonLabel, { position: "floating" }, "Password"),
                    react_1["default"].createElement(react_2.IonInput, { type: "password", value: password, onIonChange: function (e) { return setPassword(e.detail.value); }, id: "password" })),
                react_1["default"].createElement(react_2.IonItem, { "class": "login-input" },
                    react_1["default"].createElement(react_2.IonLabel, { position: "floating" }, "Confirm Password"),
                    react_1["default"].createElement(react_2.IonInput, { type: "password", value: confirmPassword, onIonChange: function (e) { return setConfirmPassword(e.detail.value); }, id: "confirm" })),
                react_1["default"].createElement(react_2.IonButton, { className: "ion-margin-top", onClick: handleUpdate, expand: "block" }, "Update")),
            react_1["default"].createElement(react_2.IonRow, null,
                react_1["default"].createElement(react_2.IonCol, null,
                    react_1["default"].createElement("p", { style: { fontSize: 'medium', textAlign: 'center' } },
                        "Already have an account? ",
                        react_1["default"].createElement("a", { href: "/" }, "Sign In!"))))),
        react_1["default"].createElement(react_2.IonFooter, null)));
};
exports["default"] = NewPassword;
