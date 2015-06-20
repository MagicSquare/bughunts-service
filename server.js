var Twitter = require('twitter'),
    twitter_extractor = require('./app/src/twitter_extractor');
 
var client = new Twitter({
  consumer_key: 'aDUG6MmnTUtfD5bALIDpaG1Ls',
  consumer_secret: 'jGwpxBXODgmSA2kqZpHo1BByHi2eh88U49sgSSE4jpINrsoS5f',
  access_token_key: '3297011716-9pKplsdEOoSyALt7HxswiWfnZElnIBBklWdLn9A',
  access_token_secret: 'hGdVNEp75oF0nhPyIv6YySZFEODgkRuC3p8idR7spuShu'
});

// Filter tweet on hashtags #bugshunt and #challenge1
client.stream('statuses/filter', {track: '#bugshunt #challenge1'},  function(stream){
  stream.on('data', function(tweet) {
    // Display the received tweet
    console.log(tweet);

    // Extract instructions
    var instructions = twitter_extractor.extractInstructions(tweet).instructions;

    // Reply to the current tweet
    var parameters = {
      status: '@' + tweet.user.name + ' ' + instructions,
      in_reply_to_status_id: tweet.id_str
    };

    client.post('statuses/update', parameters, function(error) { console.log(error); } );
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});