export const environment = {
    ApiUrl: "https://localhost:7257/api/List",

    msalConfig: {
        auth: {
            clientId: 'cc9ba8f3-2648-4bd0-970a-c50635ba22f3',
            authority: 'https://login.microsoftonline.com/common', // where MSAL sends requests to authenticate users
        },
    },
    apiConfig: {
        scopes: ['https://andrebbkorg.onmicrosoft.com/lists/api/Lists.Read'],
        uri: 'https://localhost:7257/'
    }
};
