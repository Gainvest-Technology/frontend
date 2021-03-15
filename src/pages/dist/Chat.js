"use strict";
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
    react_1.useEffect(function () {
        if (props.location.state) {
            // if (!props.location.state.data.id) {
            // 	history.push({pathname: '/login'});
            // }
            var firstName = props.location.state.data.firstName;
            var lastName = props.location.state.data.lastName;
            var name = firstName + ' ' + lastName;
            var chatId = props.location.state.data.chatId;
            var token = props.location.state.data.chatToken;
            var chatApiKey = props.location.state.data.chatApiKey;
            var chatClient_1 = new stream_chat_1.StreamChat(chatApiKey);
            chatClient_1.connectUser({
                id: chatId,
                name: firstName + ' ' + lastName,
                image: 'https://getstream.io/random_svg/?name=' + firstName
            }, token);
            // const channel = chatClient.channel('messaging', 'General', {
            // 	// add as many custom fields as you'd like
            // 	name: 'General Public Chat',
            // });
            var chatChannel_1 = chatClient_1.channel('messaging', 'GainvestChatPreview', {
                // add as many custom fields as you'd like
                name: 'Investors - General'
            });
            chatChannel_1.watch().then(function () {
                var chatComponent = react_1["default"].createElement(stream_chat_react_1.Chat, { client: chatClient_1, theme: chatStyle },
                    react_1["default"].createElement(stream_chat_react_1.ChannelList, null),
                    react_1["default"].createElement(stream_chat_react_1.Channel, { channel: chatChannel_1 },
                        react_1["default"].createElement(stream_chat_react_1.Window, null,
                            react_1["default"].createElement(stream_chat_react_2.ChannelHeader, null),
                            react_1["default"].createElement(stream_chat_react_2.MessageList, null),
                            react_1["default"].createElement(stream_chat_react_3.MessageInput, null)),
                        react_1["default"].createElement(stream_chat_react_3.Thread, null)));
                setChatComponent(chatComponent);
            });
        }
    }, [props]);
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
        react_1["default"].createElement(react_2.IonContent, null,
            react_1["default"].createElement(Header_1.Header, null),
            chatComponent),
        react_1["default"].createElement(react_2.IonToolbar, { slot: "bottom", className: "menu-tabs" },
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
                react_1["default"].createElement(react_2.IonCol, { className: "nav-toolbar-item", onClick: function () { navigate('/funds'); } },
                    react_1["default"].createElement("div", { style: { display: 'flex', alignItems: 'center' } },
                        react_1["default"].createElement(react_2.IonIcon, { style: { flex: '1' }, icon: icons_1.businessSharp })),
                    react_1["default"].createElement(react_2.IonLabel, { style: { display: 'block', textAlign: 'center', fontSize: '11px' } }, "Funds"))))));
};
exports["default"] = GainvestChat;
