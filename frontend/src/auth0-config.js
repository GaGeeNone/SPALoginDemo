// Auth0 configuration parameters
const auth0Config = {
  domain: process.env.REACT_APP_AUTH0_DOMAIN || "YOUR_AUTH0_DOMAIN",
  clientId: process.env.REACT_APP_AUTH0_CLIENT_ID || "YOUR_FRONTEND_CLIENT_ID",
  authorizationParams: {
    redirect_uri: window.location.origin + '/callback',
    audience: process.env.REACT_APP_AUTH0_AUDIENCE || "YOUR_API_IDENTIFIER",
    scope: "openid profile email"
  }
};

export default auth0Config; 