import React from "react";
import { useHistory } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";

const Auth0ProviderWithHistory = ({ children }: any) => {
    // const domain = process.env.REACT_APP_AUTH0_DOMAIN;
    // const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

    const history = useHistory();

    const onRedirectCallback = (appState: any) => {
        history.push(appState?.returnTo || window.location.pathname);
    };

    return (
        <Auth0Provider
            domain="gainvest-auth-dev.us.auth0.com"
            clientId="yqzeqinX3SCmqD7rB6d5pETE0EXvR6jH"
            redirectUri={window.location.origin + '/dashboard'}
            onRedirectCallback={onRedirectCallback}
        >
        {children}
        </Auth0Provider>
    );
};

export default Auth0ProviderWithHistory;