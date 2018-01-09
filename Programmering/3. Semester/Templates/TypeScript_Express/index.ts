// Imports
import * as express from 'express';
import * as bodyParser from 'body-parser';


// Init Express Server
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Start Express Server
let port = (process.env.PORT || 3000);
app.listen(port);
console.log(`Server Listening on Port: ${port}`);


// Logic
app.get("/", (req, resp) =>
{
resp.sendFile( __dirname + "/index.html")
});
