# README #

### Define environment mode
Define environment mode by setting the environment variable BUGSBOT_ENVIRONMENT.
ex: export BUGSBOT_ENVIRONMENT=PRODUCTION

By default, the development mode is used.

Possible values:
- 'PRODUCTION' : launch BugsBot in production mode
- everything else : launch BugsBot in development mode

### Define port
The port used by BugsBot could be define by setting the environment variable BUGSBOT_PORT.

By default, the port 8111 is used.

### Post a new challenge

*server_ip*:8111/newChallenge/*name*/*nbX*/*nbY*/*theme*/*squares*

- name: name of challenge that will be used in hashtag (don't prefix it with \#)

- nbX: number of squares on x (1 to 50)

- nbY: number of squares on y (1 to 50)

- theme: ground theme number (0 to 31)

- squares: the representation of all squares in one string (define the first row, then the second row, ...). Each character represents a square:
    - l: ladybug
    - s: stone
    - g: goal
    - o: nothing
