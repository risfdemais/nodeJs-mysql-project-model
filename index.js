// index.js
let express = require("express");
let bodyParser = require("body-parser");
let auth = require("./auth.js")();
let cors = require('cors');
let app = express();
let routes = require("./routes/routes.js");
let port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(auth.initialize());

//MALDITO CORS
app.use(cors({origin: '*',
"Access-Control-Allow-Origin": "*",
"Access-Control-Allow-Headers": "Origin, X-Requested-With, Content-Type, Accept"}));

//ROTAS
app.use(routes);


app.listen(port, function() {
  console.log("My API is running on port: " + port);
});

module.exports = app;