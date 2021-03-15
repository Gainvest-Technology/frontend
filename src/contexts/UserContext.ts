import React from "react";

const UserContext = React.createContext(
    {
        token: '',
        firstName: '',
        lastName: '',
        email: '',
        id: '',
        chatToken: '',
        chatApiKey: '',
        chatId: '',
        isLoggedIn: false
    }
); // Create a context object

export {
  UserContext // Export it so it can be used by other Components
};