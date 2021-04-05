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
var stream_chat_react_1 = require("stream-chat-react");
var stream_chat_react_2 = require("stream-chat-react");
var stream_chat_react_3 = require("stream-chat-react");
var stream_chat_1 = require("stream-chat");
var react_2 = require("@ionic/react");
require("stream-chat-react/dist/css/index.css");
var react_router_dom_1 = require("react-router-dom");
var Header_1 = require("../components/Header");
var icons_1 = require("ionicons/icons");
//import async from 'async';
var GainvestChat = function (props) {
    var _a = react_1.useState('messaging light'), chatStyle = _a[0], setChatStyle = _a[1];
    //const [ chatClient, setChatClient ] = useState<any>(StreamChat.getInstance('f59jfmz43xe6'));
    var _b = react_1.useState(), chatComponent = _b[0], setChatComponent = _b[1];
    var history = react_router_dom_1.useHistory();
    var filters = { type: 'messaging' };
    var _c = react_1.useState(), chatClient = _c[0], setChatClient = _c[1];
    react_1.useEffect(function () {
        if (props.location.state) {
            var firstName_1 = props.location.state.data.firstName;
            var lastName_1 = props.location.state.data.lastName;
            var name = firstName_1 + ' ' + lastName_1;
            var chatId_1 = props.location.state.data.chatId;
            var token_1 = props.location.state.data.chatToken;
            var chatApiKey_1 = props.location.state.data.chatApiKey;
            var initChat = function () { return __awaiter(void 0, void 0, void 0, function () {
                var chatClient, chatComponent;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            chatClient = stream_chat_1.StreamChat.getInstance(chatApiKey_1);
                            return [4 /*yield*/, chatClient.connectUser({
                                    id: chatId_1,
                                    name: firstName_1 + ' ' + lastName_1,
                                    image: 'https://getstream.io/random_svg/?name=' + firstName_1
                                }, token_1)];
                        case 1:
                            _a.sent();
                            chatComponent = react_1["default"].createElement(stream_chat_react_1.Chat, { client: chatClient, theme: chatStyle },
                                react_1["default"].createElement(stream_chat_react_1.ChannelList, { filters: filters }),
                                react_1["default"].createElement(stream_chat_react_1.Channel, null,
                                    react_1["default"].createElement(stream_chat_react_1.Window, null,
                                        react_1["default"].createElement(stream_chat_react_2.ChannelHeader, null),
                                        react_1["default"].createElement(stream_chat_react_2.MessageList, null),
                                        react_1["default"].createElement(stream_chat_react_3.MessageInput, null)),
                                    react_1["default"].createElement(stream_chat_react_3.Thread, null)));
                            setChatComponent(chatComponent);
                            return [2 /*return*/];
                    }
                });
            }); };
            initChat();
        }
    }, [props]);
    function createPrivateChannel() {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    }
    // useEffect(() => {
    // 	if (props.location.state) {
    // 		// if (!props.location.state.data.id) {
    // 		// 	history.push({pathname: '/login'});
    // 		// }
    // 		const firstName = props.location.state.data.firstName;
    // 		const lastName = props.location.state.data.lastName;
    //         const name = firstName + ' ' + lastName;
    // 		const chatId = props.location.state.data.chatId;
    // 		const token = props.location.state.data.chatToken;
    // 		const chatApiKey = props.location.state.data.chatApiKey;
    // 		const chatClient = new StreamChat(chatApiKey);
    // 		chatClient.connectUser(
    // 			{
    // 				id: chatId,
    // 				name: firstName + ' ' + lastName,
    // 				image: 'https://getstream.io/random_svg/?name=' + firstName
    // 			},
    // 			token
    // 		);
    // 		// const channel = chatClient.channel('messaging', 'General', {
    // 		// 	// add as many custom fields as you'd like
    // 		// 	name: 'General Public Chat',
    // 		// });
    // 		const chatChannel = chatClient.channel('messaging', 'GainvestChatPreview', {
    // 			// add as many custom fields as you'd like
    // 			name: 'Investors - General',
    // 		});
    // 		chatChannel.watch().then(() => {
    // 			const chatComponent = <Chat client={chatClient} theme={chatStyle}>
    // 				<ChannelList/>
    // 					<Channel channel={chatChannel}>
    // 						<Window>
    // 						<ChannelHeader />
    // 						<MessageList />
    // 						<MessageInput />
    // 						</Window>
    // 						<Thread />
    // 				</Channel>
    // 			</Chat>
    // 			setChatComponent(chatComponent);
    // 		});
    // 	}
    // },[props]);  
    function navigate(route) {
        history.push({
            pathname: route,
            state: {
                data: {
                    token: props.location.state.data.token,
                    chatToken: props.location.state.data.chatToken,
                    firstName: props.location.state.data.firstName,
                    lastName: props.location.state.data.lastName,
                    email: props.location.state.data.email,
                    id: props.location.state.data.id,
                    chatApiKey: props.location.state.data.chatApiKey,
                    chatId: props.location.state.data.chatId
                }
            }
        });
    }
    // function changeTheme() {
    // 	if (theme === 'light') {
    // 		setChatStyle('messaging dark');
    // 		setTheme('dark');
    // 	}
    // 	else {
    // 		setChatStyle('messaging light');
    // 		setTheme('light');
    // 	}
    // }
    return (react_1["default"].createElement(react_2.IonPage, null,
        react_1["default"].createElement(react_2.IonContent, { style: { position: 'absolute' } },
            react_1["default"].createElement(Header_1.Header, null),
            chatComponent),
        react_1["default"].createElement(react_2.IonToolbar, { slot: "bottom", className: "menu-tabs", style: { position: 'fixed', bottom: '0' } },
            react_1["default"].createElement(react_2.IonRow, null,
                react_1["default"].createElement(react_2.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/dashboard'); } },
                    react_1["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_1["default"].createElement(react_2.IonIcon, { style: { flex: '1' }, icon: icons_1.homeSharp })),
                    react_1["default"].createElement(react_2.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Home")),
                react_1["default"].createElement(react_2.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/chat'); } },
                    react_1["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_1["default"].createElement(react_2.IonIcon, { style: { flex: '1' }, icon: icons_1.chatboxEllipsesSharp })),
                    react_1["default"].createElement(react_2.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Chat")),
                react_1["default"].createElement(react_2.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/documents'); } },
                    react_1["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_1["default"].createElement(react_2.IonIcon, { style: { flex: '1' }, icon: icons_1.documentsSharp })),
                    react_1["default"].createElement(react_2.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Portfolio")),
                react_1["default"].createElement(react_2.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/menu'); } },
                    react_1["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_1["default"].createElement(react_2.IonIcon, { style: { flex: '1' }, icon: icons_1.gridOutline })),
                    react_1["default"].createElement(react_2.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Menu"))))));
};
exports["default"] = GainvestChat;
