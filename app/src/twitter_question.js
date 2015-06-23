var Twitter = require('twitter');

exports.ask = function (challenge) {

    var client = new Twitter({ // bugshunt_dev
        consumer_key: 'pnxVwUVRnNNPdVI4Zyd8QdgDt',
        consumer_secret: 'mV7oNf2PORH2iXD2AUuLsxHrRGy8esP1Hvkf8cf01CsJJro1rP',
        access_token_key: '3337904121-Glzb3mRseE0rN8UiU7UZ3xyEamDkZmnMYUhDRqX',
        access_token_secret: 'pQu6Vit7sNKzNpqjeKQ0Gndd8u6B3b7JC8niKCgHTBZ7e'
    });

    // Post challenge
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