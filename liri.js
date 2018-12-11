require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./key.js")
var fs = require("fs");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var subject = process.argv;


if (input == "concert-this") {
    var stuff = subject.slice(3, subject.length)
    var artist = ""
    for (var i in stuff){
        if (i == stuff.length-1) {
            artist = artist + stuff[i]
        } else{
            artist = artist + stuff[i] + "%20"
        }
        
    }
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var results = JSON.parse(body);
            for (var i in results) {
                console.log("---------------")
                console.log(results[i].venue.name);
                console.log(results[i].venue.city);
                console.log(results[i].datetime);
            }
        } else{
            
        }
    })
} else if (input == "spotify-this-song") {
    if (typeof(process.argv[3]) == "undefined") {
        var song = "The Sign"
    } else {
        var stuff = subject.slice(3, subject.length)
        var song = ""
        for (var i in stuff){
            if (i == stuff.length-1) {
                song = song + stuff[i]
            } else{
                song = song + stuff[i] + " "
            }
        }   
    }
    spotify.search({ type: 'track', query: song, market: "US" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        console.log(data.tracks.items[0].album.artists);
    })
} else if (input == "movie-this") {
    if (typeof(process.argv[3]) == "undefined") {
        var movie = "Mr.+Nobody"
    } else {
        var stuff = subject.slice(3, subject.length)
        var movie = ""
        for (var i in stuff){
            if (i == stuff.length-1) {
                movie = movie + stuff[i]
            } else{
                movie = movie + stuff[i] + " "
            }
        }   
    }
    var url = "https://www.omdbapi.com/?t="+movie+"&plot=short&apikey=trilogy";
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var results = JSON.parse(body);
            console.log("Title: "+results.Title);
            console.log("Year: "+results.Year);
            console.log("IMDB Rating: "+results.Ratings[0].Value);
            console.log("Rotten Tomatoes Score: "+results.Ratings[1].Value);
            console.log("Country: "+results.Country);
            console.log("Language: "+results.Language);
            console.log("Plot: "+results.Plot);
            console.log("Actors: "+results.Actors);

        } else{
            
        }
    })
} else if (input=="do-what-it-says"){
    fs.readFile("random.txt","utf8", function(err, data){
        if (error) {
            return console.log(error);
        }
        console.log(data);
    })
}

