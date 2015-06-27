if (process.env.BUGSBOT_ENVIRONMENT === 'PRODUCTION') {
    exports.credentials = {
        // bughunts
        consumer_key: 'y9bcxed3DI1CUtsWPklMSGlmD',
        consumer_secret: 'BjrIPfXKEjbLX0cC6CMEXT1OrQveMeaE9hRFY3i2J8zkx6s1ax',
        access_token_key: '3344396026-sg94YAT9rpX7bhtbwmxPSUL5cZ2Gmp2NKAl23Mi',
        access_token_secret: 'Zbo6Dr1WzXamwvigIQR10SeaXhEwZ1e3szQ3W6FdwGEQx'
    };
    exports.botAccount = '@BugHunts';
} else {
    exports.credentials = {
        // bugshunt_dev
        consumer_key: 'pnxVwUVRnNNPdVI4Zyd8QdgDt',
        consumer_secret: 'mV7oNf2PORH2iXD2AUuLsxHrRGy8esP1Hvkf8cf01CsJJro1rP',
        access_token_key: '3337904121-Glzb3mRseE0rN8UiU7UZ3xyEamDkZmnMYUhDRqX',
        access_token_secret: 'pQu6Vit7sNKzNpqjeKQ0Gndd8u6B3b7JC8niKCgHTBZ7e'
    };
    exports.botAccount = '@bugshunt_dev';
}