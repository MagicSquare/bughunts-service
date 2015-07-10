var Twitter = require('twitter'),
    twitter_credentials = require('../res/twitter_credentials'),
    followersBlackList = require('../res/followers_blacklist'),
    ChallengeService = require('./challengeService');

function pushFollowers(cursor, client, hashTag, callback) {
    var followersListParameters = {
        screen_name: twitter_credentials.botAccount.slice(1), // remove @
        cursor: cursor
    };
    client.get('followers/list', followersListParameters, function (error, result) {
        if (error || result.errors || result.message) {
            console.log(error);
            callback(0);
        }
        cursor = result.nextCursor;
        var followersToPush = result.users.filter(function (follower) {
            return followersBlackList.blacklist.indexOf(follower.screen_name) === -1;
        });
        followersToPush.map(function (follower) {
            var followersPushParameters = {
                screen_name: follower.screen_name,
                text: 'Be the first to solve the new challenge : ' + hashTag + ' (Reply STOP to unsubscribe)'
            };
            client.post('direct_messages/new', followersPushParameters, function (error) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Notification sent to ' + follower.screen_name);
                }
            });
        });
        callback(cursor);
    });
}

exports.ask = function (game) {

    var client = new Twitter(twitter_credentials.credentials);
    client.post('media/upload', {media: game.mapImage}, function (error, media, response) {
        if (error) {
            console.log(error);
            return;
        }
        var postAllParameters = {
            status: 'New challenge : ' + game.hashTag,
            media_ids: media.media_id_string // Pass the media id string
        };

        client.post('statuses/update', postAllParameters, function (error, tweet, response) {
            if (error) {
                console.log(error);
                return;
            }

            ChallengeService.registerChallenge(game, function (err) {
                if (err) {
                    return;
                }
                function pushFollowersLoop(cursor) {
                    pushFollowers(cursor, client, game.hashTag, function (cursor) {
                        if (cursor !== 0 && cursor !== null && cursor !== undefined) {
                            pushFollowersLoop(cursor);
                        }
                    });
                }
                pushFollowersLoop(-1);
            });
        });
    });
};