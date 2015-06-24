var Twitter = require('twitter'),
    twitter_credentials = require('../res/twitter_credentials');

exports.ask = function (challenge) {

    var client = new Twitter(twitter_credentials.credentials);
    client.post('media/upload', {media:challenge.mapImage}, function (error, media, response) {
        if (!error) {
            var parameters = {
                status: 'New challenge : ' + challenge.hashTag,
                media_ids: media.media_id_string // Pass the media id string
            };

            client.post('statuses/update', parameters, function(error, tweet, response){
                if (error) {
                    console.log(error);
                }
            });

        } else {
            console.log(error);
        }
    });
};