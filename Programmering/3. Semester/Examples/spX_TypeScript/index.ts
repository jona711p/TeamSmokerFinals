import * as express from "express";
import * as fs from "fs";
import * as request from "request";
import { stringify } from "querystring";


let app = express();

const jokeArray: any[] = [];


app.get("/", (req, resp) => {

    resp.sendFile(__dirname + "/index.html");
});


app.get("/chuckJoke", (req, resp) => {

    let options = {
        method: "GET",
        url: "https://api.chucknorris.io/jokes/random",
        headers:
            {
                accept: 'application/json'
            }
    }

    request(options, function (error, response, body) {

        let data = JSON.parse(body)
        let joke = data.value;
        let rating = 0;

        jokeArray.push({ joke, rating });

        let jokeNumber = jokeArray.length - 1;
        console.log(joke);

        let jokeObj = {
            joke: joke,
            id: jokeNumber
        }

        resp.send(jokeObj)
    });
});


app.get("/dadJoke", (req, resp) => {

    let options = {
        method: "GET",
        url: "http://icanhazdadjoke.com/",
        headers:
            {
                accept: 'application/json'
            }
    }

    request(options, function (error, response, body) {

        let data = JSON.parse(body)
        let joke = data.joke;
        let rating = 0;

        jokeArray.push({ joke, rating });

        let jokeNumber = jokeArray.length - 1;

        console.log(joke);

        let jokeObj = {
            joke: joke,
            id: jokeNumber
        }

        resp.send(jokeObj)
    });
});


app.put("/upvoteChuckJoke/:id", (req, resp) => {

    let id = req.params.id;

    jokeArray[id].rating++

    console.log(jokeArray);

    fs.writeFileSync("jokeDB.txt", jokeArray.toString());

    resp.send("Chuck Joke Wins");
});


app.put("/upvoteDadJoke/:id", (req, resp) => {

    let id = req.params.id;

    jokeArray[id].rating++

    console.log(jokeArray);

    fs.writeFileSync("jokeDB.txt", JSON.stringify(jokeArray));

    resp.send("Dad Joke Wins");
});


let port = (process.env.PORT || 3000);
app.listen(port);
console.log(`Server Listening on Port: ${port}`);