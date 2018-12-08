require("dotenv").config();
var fs = require("fs");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var input = process.argv[2];

console.log(process.argv[3]);

if (input == "concert-this") {
    var artist = process.argv[3]
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
        } else{
            
        }
    })
} else if (input == "spotify-this-song") {
    if (typeof(process.argv[3]) == "undefined") {
        var song = "The Sign"
    } else {
        var song = process.argv[3];
    }
    spotify.search({ type: 'track', query: song, market: "US" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(data);
    })
} else if (input == "movie-this") {
    var movie = process.argv[3]
    var url = "https://www.omdbapi.com/?t="+movie+"&y=&plot=short&apikey=trilogy";
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            console.log(body)
        } else{
            
        }
    })
} else if (inpit=="do-what-it-says"){
    fs.readFile("random.txt","utf8", function(err, data){
        if (error) {
            return console.log(error);
        }
        console.log(data);
    })
}

