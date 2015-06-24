var Twitter = require('twitter'),
    RestClient = require('node-rest-client').Client,
    twitter_extractor = require('./twitter_extractor');

exports.listen = function (challenge) {

    var client = new Twitter({ // bugshunt_dev
        consumer_key: 'pnxVwUVRnNNPdVI4Zyd8QdgDt',
        consumer_secret: 'mV7oNf2PORH2iXD2AUuLsxHrRGy8esP1Hvkf8cf01CsJJro1rP',
        access_token_key: '3337904121-Glzb3mRseE0rN8UiU7UZ3xyEamDkZmnMYUhDRqX',
        access_token_secret: 'pQu6Vit7sNKzNpqjeKQ0Gndd8u6B3b7JC8niKCgHTBZ7e'
    });

    client.stream('statuses/filter', {track: '#bugshunt ' + challenge.hashTag}, function (stream) {
        stream.on('data', function (tweet) {
            var instructions = twitter_extractor.extractInstructions(tweet).instructions;

            var message;
            var result = challenge.tryChallenge(instructions);
            if (result.win) {
                message = "Bravo ! vous avez réussi le challenge " + challenge.hashTag + " en " + result.nbInstructions;
            } else {
                message = "Raté...";
            }

            var nbX = challenge.map.length;
            var nbY = challenge.map[0].length;
            var mapString = '';
            challenge.map.map(function (line) {
                line.map(function (square) {
                    mapString += square;
                });
            });
            var instWithComma = instructions.replace(/\s/g, ';');
            var mapClient = new RestClient();
            mapClient.get('http://151.80.235.36:8000/' + nbX + '/' + nbY + '/' + challenge.theme + '/' + mapString + '/' + instWithComma, function (data, response) {
                client.post('media/upload', {media: data}, function (error, media, response) {
                    if (!error) {
                        var parameters = {
                            // Reply to the current tweet
                            status: '@' + tweet.user.name + ' ' + message,
                            in_reply_to_status_id: tweet.id_str,
                            media_ids: media.media_id_string // Pass the media id string
                        };

                        client.post('statuses/update', parameters, function (error) {
                            if (error) {
                                console.log(error);
                            }
                        });
                    }
                });
            });
        });

        stream.on('error', function (error) {
            console.log(error);
        });
    });
};