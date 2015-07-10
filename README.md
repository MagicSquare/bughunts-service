# Bughunts service #

This service serves bughunts data as challenges and scores. It is able to play a challenge with a command by returning a result.

It is also able to listen twitter stream and automatically reply.

### Setting up ###

    npm install

### Environments variables

* BUGHUNTS_SRV_PORT: Port used by the service (default 8111)

* BUGHUNTS_SRV_DB: Url of the mongodb database (default mongodb://localhost:27017/bughunts)

* BUGHUNTS_SRV_TWITTER_LISTEN: Listen or not twitter stream (default FALSE)

Example:

    export BUGHUNTS_SRV_PORT=8111
    export BUGHUNTS_SRV_DB=mongodb://localhost:27017/bughunts
    export BUGHUNTS_SRV_TWITTER_LISTEN=false

### Twitter credentials

In order to listen twitter stream, you need to set the environment variable to TRUE and add a file app/res/twitter_credentials with your twitter application credentials:

    exports.credentials = {
        consumer_key: '',
        consumer_secret: '',
        access_token_key: '',
        access_token_secret: ''
    };
    exports.botAccount = '@yourtwittername';

### Post a new challenge

{server_ip}:{serve_port}/newChallenge/*name*/*nbX*/*nbY*/*theme*/*squares*

- name: name of challenge that will be used in hashtag (don't prefix it with \#)

- nbX: number of squares on x (1 to 50)

- nbY: number of squares on y (1 to 50)

- theme: ground theme number (0 to 31)

- squares: the representation of all squares in one string (define the first row, then the second row, ...). Each character represents a square:
    - l: ladybug
    - s: stone
    - g: goal
    - o: nothing