var twitter_credentials = require('../res/twitter_credentials');

exports.extractInstructions = function (tweet) {
    // TODO extract twitter account from credentials
    var tweetData = tweet.text.match(/@bugshunt_dev (#\S*) (.*)/);

    if (tweetData){
        return {
            challenge: tweetData[1],
            instructions : tweetData[2]
        };
    }else{
        return null;
    }

};
