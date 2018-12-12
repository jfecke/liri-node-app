require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./key.js")
var fs = require("fs");
var request = require("request");
var spotify = new Spotify(keys.spotify);
var input = process.argv[2];
var subject = process.argv;

var moviethis = function(movie) {
    console.log(movie)
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

            var text = "movie-this " + movie + "\r\n" + "Title: "+results.Title + "\r\n" + "Year: "+results.Year +"\r\n" 
            + "IMDB Rating: "+results.Ratings[0].Value + "\r\n" + "Rotten Tomatoes Score: "+results.Ratings[1].Value + "\r\n" +
            "Country: "+results.Country + "\r\n" + "Language: "+results.Language + "\r\n" + "Plot: "+results.Plot + "\r\n" +
            "Actors: "+results.Actors + "\r\n"
            appendthis(text);
        } else{
            
        }
    })
}

var artistthis = function(artist) {
    var url = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";
    request(url, function(error, response, body) {
        if (!error && response.statusCode === 200) {
            var results = JSON.parse(body);
            var text = "concert-this " + artist + "\r\n";
            for (var i in results) {
                console.log("---------------")
                console.log(results[i].venue.name);
                console.log(results[i].venue.city);
                console.log(results[i].datetime);
                text += "---------------\r\n" + results[i].venue.name + "\r\n" + results[i].venue.city + "\r\n" + results[i].datetime + "\r\n"
            }
            text += "\r\n"
            appendthis(text)
        } else{
            
        }
    })
}

var spotifythis = function(song) {
    console.log(song);
    spotify.search({ type: 'track', query: song, market: "US" }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }
        for (var j in data.tracks.items)    {
            var artists_arr = data.tracks.items[j].artists
            var artists = "Artists: "
            for (var i in artists_arr) {
                if (i == 0) {
                    artists += artists_arr[i].name
                } else {
                    artists += ", " + artists_arr[i].name
                }
            }
            var brk = "---------------------\r\n";
            var title = "Song: " + data.tracks.items[j].name;
            var link = "Link: " + data.tracks.items[j].href;
            var album = "Album: " + data.tracks.items[j].album.name
            var text = brk + artists + "\r\n" + title + "\r\n" + album + "\r\n" + link;
            console.log(text);
        }
    })
}

var appendthis = function(file) {
    fs.appendFile("log.txt", file, function(err){
        if (err) {
            return console.log("there was an error")
        }
    })
}

if (input == "concert-this") {
    var stuff = subject.slice(3, subject.length)
    var artist = ""
    for (var i in stuff){
        if (i == stuff.length-1) {
            artist = artist + stuff[i]
        } else{
            artist += stuff[i] + "%20"
        }
        
    }
    artistthis(artist);

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
                song += stuff[i] + " "
            }
        }   
    }
    spotifythis(song);

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
                movie += stuff[i] + " "
            }
        }   
    }
    moviethis(movie);
    
} else if (input=="do-what-it-says"){
    fs.readFile("random.txt","utf8", function(error, data){
        if (error) {
            return console.log(error);
        }
        var arr = data.split(";")
        var num = Math.floor(Math.random()* 3);
        var choice = arr[num];
        var selection = choice.split(",");
        if (selection[0].trim() == "concert-this") {
            artistthis(selection[1])
        } else if (selection[0].trim() == "spotify-this-song") {
            spotifythis(selection[1])
        } else if (selection[0].trim() == "movie-this") {
            moviethis(selection[1])
        }
    })
}
