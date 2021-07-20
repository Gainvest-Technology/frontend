import { StreamChat } from "stream-chat";
const chatApiKey = process.env.REACT_APP_STREAM_API_KEY || "";
const chatClient = StreamChat.getInstance(chatApiKey, { timeout: 6000 });

export default chatClient;
