var Twitter = require('twitter'),
    twitter_credentials = require('../res/twitter_credentials'),
    followersBlackList = require('../res/followers_blacklist');

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

            var followersListParameters = {
                screen_name: twitter_credentials.botAccount.slice(1) // remove @
            };
            client.get('followers/list', followersListParameters, function(error, result) {
                var followersToPush = result.users.filter(function(follower) {
                    return followersBlackList.blacklist.indexOf(follower.screen_name) === -1;
                });
                followersToPush.map(function(follower) {
                    var followersPushParameters = {
                        screen_name: follower.screen_name,
                        text: 'Be the first to solve the new challenge : ' + challenge.hashTag + ' (Reply STOP to unsubscribe)'
                    };
                    client.post('direct_messages/new', followersPushParameters, function(error) {
                       if (error) {
                           console.log(error);
                       }
                    });
                });
            });

        } else {
            console.log(error);
        }
    });
};