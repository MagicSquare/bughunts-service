exports.extractInstructions = function (tweet) {
    var tweetData = tweet.text.match(/#bugshunt (.*) (.*)/);

    if (tweetData){
        return {
            challenge: tweetData[1],
            instructions : tweetData[2]
        };
    }else{
        return null;
    }

};
