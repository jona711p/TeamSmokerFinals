var jokeArray = [];

let chuckjoke;
let dadjoke;


function getJokes() {

    getChuckJoke();
    getDadJoke();
};


function getChuckJoke() {

    $.ajax({
        type: "GET",
        url: "https://api.chucknorris.io/jokes/random",
        headers: { "Accept": "application/json" },
        success: function (data) {

            chuckjoke = {
                id: data.id,
                joke: data.value
            }

            let div = document.getElementById("chuckJoke");

            div.innerText = data.value;
        }
    })
};


function getDadJoke() {

    $.ajax({
        type: "GET",
        url: "https://icanhazdadjoke.com/",
        headers: { "Accept": "application/json" },
        success: function (data) {

            dadjoke = {
                id: data.id,
                joke: data.joke
            }

            let div = document.getElementById("dadJoke");

            div.innerText = data.joke;
        }
    })
};


$("#chuckBest").click(function () {

    jokeArray.push({ origin: "Chuck Joke", id: chuckjoke.id, joke: chuckjoke.joke });
    getJokes();
});


$("#dadBest").click(function () {

    jokeArray.push({ origin: "Dad Joke", id: dadjoke.id, joke: dadjoke.joke });
    getJokes();
});


$("#newJokes").click(function () {
    getJokes();
});


window.onload = getJokes();