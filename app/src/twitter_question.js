var Twitter = require('twitter'),
    twitter_credentials = require('../res/twitter_credentials');

exports.ask = function (challenge) {

    var client = new Twitter(twitter_credentials.credentials);
    client.post('media/upload', {media:challenge.mapImage}, function (error, media, response) {
        if (!error) {
            var postAllParameters = {
                status: 'New challenge : ' + challenge.hashTag,
                media_ids: media.media_id_string // Pass the media id string
            };

            client.post('statuses/update', postAllParameters, function(error, tweet, response){
                if (error) {
                    console.log(error);
                }
            });

            /*var followersParameters = {

            };
            client.get('followers/list', followersParameters, function(followers) {
                console.log(followers);
            });*/

        } else {
            console.log(error);
        }
    });
};