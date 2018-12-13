# liri-node-app
LIRI Bot

This is a Node.JS program. You will need to run this from your console.

The following are commands used in this program:
concert-this
spotify-this-song
movie-this
do-what-it-says

concert-this

Example:

node liri concert-this Maroon 5

This will search the Bands in Town Artist Events API for an artist and render the following information about each event to the terminal:

Name of the venue
Venue location
Date of the Event in the format MM/DD/YYYY

spotify-this-song

Example:

node liri spotify-this-song Thunderstruck

This will search Spotify for the song and return at most a list of 10 responses showing the following for each:

Artist(s)
The song's name
Preview Link of the Song
Song Album

do-what-it-says

Example:

node liri.js do-what-it-says

This will run one of the other commands with predefined input at random.

node liri concert-this Maroon 5
node liri spotify-this-song I Want it That Way
node liri movie-this Gladiator


