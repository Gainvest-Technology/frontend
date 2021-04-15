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
var react_1 = require("@ionic/react");
var react_2 = require("react");
var react_router_dom_1 = require("react-router-dom");
var axios_1 = require("axios");
var Portal = function () {
    var history = react_router_dom_1.useHistory();
    var _a = react_2.useState(''), email = _a[0], setEmail = _a[1];
    var _b = react_2.useState(''), password = _b[0], setPassword = _b[1];
    var _c = react_2.useState(false), iserror = _c[0], setIserror = _c[1];
    var _d = react_2.useState(''), message = _d[0], setMessage = _d[1];
    function validateEmail(email) {
        var regexp = new RegExp(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regexp.test(String(email).toLowerCase());
    }
    var handleLogin = function (event) { return __awaiter(void 0, void 0, void 0, function () {
        var loginData, api;
        return __generator(this, function (_a) {
            if (!email) {
                setMessage('Please enter a valid email');
                setIserror(true);
                return [2 /*return*/];
            }
            if (validateEmail(email) === false) {
                setMessage('Your email is invalid');
                setIserror(true);
                return [2 /*return*/];
            }
            if (!password || password.length < 6) {
                setMessage('Please enter your password');
                setIserror(true);
                return [2 /*return*/];
            }
            loginData = {
                email: email,
                password: password
            };
            api = axios_1["default"].create({
                baseURL: 'https://gainvest-api.com'
                //baseURL: 'http://localhost:3000'
            });
            api
                .post('/users/login', loginData)
                .then(function (response) {
                if (response.data.needsUpdate) {
                    history.push({
                        pathname: '/new_password',
                        state: {
                            data: {
                                email: response.data.email
                            }
                        }
                    });
                }
                else {
                    history.push({
                        pathname: '/dashboard',
                        state: {
                            data: {
                                token: response.data.token,
                                chatToken: response.data.chatToken,
                                firstName: response.data.firstName,
                                lastName: response.data.lastName,
                                email: response.data.email,
                                id: response.data.userId,
                                chatApiKey: response.data.chatApiKey,
                                chatId: response.data.chatId
                            }
                        }
                    });
                }
            })["catch"](function (error) {
                setMessage('Email and/or Password Is Incorrect');
                setIserror(true);
            });
            return [2 /*return*/];
        });
    }); };
    return (react_2["default"].createElement(react_1.IonPage, null,
        react_2["default"].createElement(react_1.IonContent, { className: "space-bg", fullscreen: true },
            react_2["default"].createElement(react_1.IonRow, null,
                react_2["default"].createElement(react_1.IonCol, null,
                    react_2["default"].createElement(react_1.IonAlert, { isOpen: iserror, onDidDismiss: function () { return setIserror(false); }, cssClass: "my-custom-class", header: 'Error!', message: message, buttons: ['Dismiss'] }))),
            react_2["default"].createElement(react_1.IonRow, null,
                react_2["default"].createElement(react_1.IonCol, { "class": "logo-container" },
                    react_2["default"].createElement(react_1.IonImg, { "class": "logo", src: 'https://gainvestco.s3.us-east-2.amazonaws.com/gainvest_logo.png' }))),
            react_2["default"].createElement("form", { className: "form" },
                react_2["default"].createElement(react_1.IonItem, { "class": "login-input" },
                    react_2["default"].createElement(react_1.IonLabel, { position: "floating" }, "Email"),
                    react_2["default"].createElement(react_1.IonInput, { type: "email", value: email, onIonChange: function (e) { return setEmail(e.detail.value); } })),
                react_2["default"].createElement(react_1.IonItem, { "class": "login-input" },
                    react_2["default"].createElement(react_1.IonLabel, { position: "floating" }, "Password"),
                    react_2["default"].createElement(react_1.IonInput, { type: "password", value: password, onIonChange: function (e) { return setPassword(e.detail.value); } })),
                react_2["default"].createElement(react_1.IonButton, { className: "ion-margin-top", onClick: handleLogin, expand: "block" }, "Login"),
                react_2["default"].createElement("p", { style: { fontSize: 'medium', textAlign: 'center', color: '#000', marginTop: '30px' } },
                    "Don't have an account? ",
                    react_2["default"].createElement("a", { href: "/signup" }, "Sign up!"))))));
};
exports["default"] = Portal;
