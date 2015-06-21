var Twitter = require('twitter'),
    twitter_extractor = require('./app/src/twitter_extractor'),
    challenge = require('./app/src/challenge');

/*var client = new Twitter({ // MagicSquare_FR
    consumer_key: 'aDUG6MmnTUtfD5bALIDpaG1Ls',
    consumer_secret: 'jGwpxBXODgmSA2kqZpHo1BByHi2eh88U49sgSSE4jpINrsoS5f',
    access_token_key: '3297011716-9pKplsdEOoSyALt7HxswiWfnZElnIBBklWdLn9A',
    access_token_secret: 'hGdVNEp75oF0nhPyIv6YySZFEODgkRuC3p8idR7spuShu'
});*/

var client = new Twitter({ // TeamMagicSquare
    consumer_key: 'hfSjot7L3dUL8mezoAn1gLoqh',
    consumer_secret: 'xwNEnUfw9JK9uYvpdZscjOKQNVCE3T0D5nHVg5rbJio2Acch8d',
    access_token_key: '3290556340-7rO4ZSN3JYTh1QlfLqdw2AhNx9aBsOcGjtHWR4X',
    access_token_secret: 'AqbwApKLWAxpsjgduaIaY8JIHUPfWAoZB0kpZVBzOjnWc'
});

// Filter tweet on hashtags #bugshunt and #challenge1
client.stream('statuses/filter', {track: '#bugshunt #challenge1'},  function(stream){
    stream.on('data', function(tweet) {
        // Display the received tweet
        console.log(tweet);

        // Extract instructions
        var instructions = twitter_extractor.extractInstructions(tweet).instructions;

        var message;
        if (challenge.tryChallenge(instructions.split(' '))){
            message = "Bravo !";
        }else{
            message = "Raté...";
        }

        // Reply to the current tweet
        var parameters = {
            status: '@' + tweet.user.name + ' ' + message,
            in_reply_to_status_id: tweet.id_str
        };

        client.post('statuses/update', parameters, function(error) { console.log(error); } );
    });

    stream.on('error', function(error) {
        console.log(error);
    });
});