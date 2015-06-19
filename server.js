var Twitter = require('twitter');
 
var client = new Twitter({
  consumer_key: 'aDUG6MmnTUtfD5bALIDpaG1Ls',
  consumer_secret: 'jGwpxBXODgmSA2kqZpHo1BByHi2eh88U49sgSSE4jpINrsoS5f',
  access_token_key: '3297011716-9pKplsdEOoSyALt7HxswiWfnZElnIBBklWdLn9A',
  access_token_secret: 'hGdVNEp75oF0nhPyIv6YySZFEODgkRuC3p8idR7spuShu'
});

client.stream('statuses/filter', {track: '#bugshunt #challenge1'},  function(stream){
  stream.on('data', function(tweet) {
    console.log(tweet.text);
  });

  stream.on('error', function(error) {
    console.log(error);
  });
});