exports.extractInstructions = function (tweet) {
    var tweetData = tweet.text.match(/#bugshunt #challenge(\d+) (.*)/);

    if (tweetData){
        return {
            challenge: tweetData[1],
            instructions : tweetData[2]
        };
    }else{
        return null;
    }

};
