export const azureAuthConfig = {
    clientId: 'b51b4cf0-0610-4600-bda7-efb1bdf7b058',
    tenantId: 'common',
    redirectUri: 'myapp://auth',
    bundleIdentifier: 'com.myapp',
    scopes: ['User.Read', 'openid', 'profile', 'email'],
    discovery: {
      authorizationEndpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/authorize`,
      tokenEndpoint: `https://login.microsoftonline.com/common/oauth2/v2.0/token`,
      issuer: `https://login.microsoftonline.com/common/v2.0`,
    },
  };