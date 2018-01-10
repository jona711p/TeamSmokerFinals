"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var fs = require("fs");
var request = require("request");
var app = express();
var jokeArray = [];
app.get("/", function (req, resp) {
    resp.sendFile(__dirname + "/index.html");
});
app.get("/chuckJoke", function (req, resp) {
    var options = {
        method: "GET",
        url: "https://api.chucknorris.io/jokes/random",
        headers: {
            accept: 'application/json'
        }
    };
    request(options, function (error, response, body) {
        var data = JSON.parse(body);
        var joke = data.value;
        var rating = 0;
        jokeArray.push({ joke: joke, rating: rating });
        var jokeNumber = jokeArray.length - 1;
        console.log(joke);
        var jokeObj = {
            joke: joke,
            id: jokeNumber
        };
        resp.send(jokeObj);
    });
});
app.get("/dadJoke", function (req, resp) {
    var options = {
        method: "GET",
        url: "http://icanhazdadjoke.com/",
        headers: {
            accept: 'application/json'
        }
    };
    request(options, function (error, response, body) {
        var data = JSON.parse(body);
        var joke = data.joke;
        var rating = 0;
        jokeArray.push({ joke: joke, rating: rating });
        var jokeNumber = jokeArray.length - 1;
        console.log(joke);
        var jokeObj = {
            joke: joke,
            id: jokeNumber
        };
        resp.send(jokeObj);
    });
});
app.put("/upvoteChuckJoke/:id", function (req, resp) {
    var id = req.params.id;
    jokeArray[id].rating++;
    console.log(jokeArray);
    fs.writeFileSync("jokeDB.txt", jokeArray.toString());
    resp.send("Chuck Joke Wins");
});
app.put("/upvoteDadJoke/:id", function (req, resp) {
    var id = req.params.id;
    jokeArray[id].rating++;
    console.log(jokeArray);
    fs.writeFileSync("jokeDB.txt", JSON.stringify(jokeArray));
    resp.send("Dad Joke Wins");
});
var port = (process.env.PORT || 3000);
app.listen(port);
console.log("Server Listening on Port: " + port);
