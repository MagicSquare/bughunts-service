exports.extractInstructions = function (tweet) {
    // ex: '@BugsHunt #0x4242 FO RI FO RI'
    var tweetData = tweet.text.match(/(@\S*).*(#\S*)\s*(.*)/);
    if (tweetData){
        return {
            challenge: tweetData[2],
            instructions : tweetData[3]
        };
    }else{
        return null;
    }

};
