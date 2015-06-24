var Twitter = require('twitter'),
    RestClient = require('node-rest-client').Client,
    twitter_extractor = require('./twitter_extractor'),
    twitter_credentials = require('../res/twitter_credentials');

exports.listen = function (challenge) {

    var client = new Twitter(twitter_credentials.credentials);
    client.stream('statuses/filter', {track: twitter_credentials.botAccount + ' ' + challenge.hashTag}, function (stream) {
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

            var splittedInstructions = instructions.split(' ');
            var expandedInstructions = '';
            for (var i = 0; i < splittedInstructions.length; i++) {
                if (!isNaN(splittedInstructions[i])) {
                    var parameter = parseInt(splittedInstructions[i]) - 1;
                    for (var c = 0; c < parameter; c++) {
                        expandedInstructions += splittedInstructions[i-1] + ';';
                    }
                } else {
                    expandedInstructions += splittedInstructions[i] + ';';
                }
            }
            var mapClient = new RestClient();
            mapClient.get('http://151.80.235.36:8000/' + nbX + '/' + nbY + '/' + challenge.theme + '/' + mapString + '/' + expandedInstructions, function (data, response) {
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