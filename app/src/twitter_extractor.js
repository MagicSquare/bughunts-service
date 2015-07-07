
// ex: '@BugsHunt #0x4242 FO RI FO RI'
// Groups:
// - (@\S*\b)\s*: @bugshunt following by spaces
// - (.*#\S*\b)?\s*: everything then a hashtag (or not)
// - .*[a-z]{3,}\b)?\s+: everything then a word of 3 characters or more or nothing
// - ((\s*([a-z]{2}|\d+)\b)*): list of 2 chars instructions or numbers
// - \b\s*: trim spaces
var tweetRegex = /(@\S*\b)\s*(.*#\S*\b)?\s*(.*[a-z]{3,}\b)?\s+((\s*([a-z]{2}|\d+)\b)*)\b\s*/i;

exports.extractInstructions = function (tweet) {
    
    var tweetData = tweetRegex.exec(tweet.text);
    if(tweetData && tweetData.length >= 4 && tweetData[4].length > 0){
        return {
            challenge: tweetData[2],
            instructions : tweetData[4].replace(/\s{2,}/g, ' ')
        };
    }else{
        return null;
    }

};
