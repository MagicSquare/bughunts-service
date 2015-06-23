var Twitter = require('twitter'),
    twitter_extractor = require('./twitter_extractor');

exports.listen = function(challenge) {

    var client = new Twitter({ // bugshunt_dev
        consumer_key: 'pnxVwUVRnNNPdVI4Zyd8QdgDt',
        consumer_secret: 'mV7oNf2PORH2iXD2AUuLsxHrRGy8esP1Hvkf8cf01CsJJro1rP',
        access_token_key: '3337904121-Glzb3mRseE0rN8UiU7UZ3xyEamDkZmnMYUhDRqX',
        access_token_secret: 'pQu6Vit7sNKzNpqjeKQ0Gndd8u6B3b7JC8niKCgHTBZ7e'
    });

// Filter tweet on hashtags #bugshunt and #challenge1
    client.stream('statuses/filter', {track: '#bugshunt ' + challenge.hashTag}, function (stream) {
        stream.on('data', function (tweet) {
            // Extract instructions
            var instructions = twitter_extractor.extractInstructions(tweet).instructions;

            var message;
            var result = challenge.tryChallenge(instructions);
            if (result.win) {
                message = "Bravo ! vous avez réussi le challenge en "+result.nbInstructions;
            } else {
                message = "Raté...";
            }

            // Reply to the current tweet
            var parameters = {
                status: '@' + tweet.user.name + ' ' + message,
                in_reply_to_status_id: tweet.id_str
            };

            client.post('statuses/update', parameters, function (error) {
                if (error) {
                    console.log(error);
                }
            });
        });

        stream.on('error', function (error) {
            console.log(error);
        });
    });
};