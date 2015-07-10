exports.listenTwitter = (process.env.BUGHUNTS_SRV_TWITTER_LISTEN === 'TRUE');
exports.db = process.env.BUGHUNTS_SRV_DB || 'mongodb://localhost:27017/bughunts';
exports.port = process.env.BUGHUNTS_SRV_PORT || 8111;
