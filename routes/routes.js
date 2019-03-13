let express = require("express");
let router = express.Router();
let mysql = require("mysql")
var auth = require("../auth.js")();
var jwt = require("jwt-simple");
var auth = require("../auth.js")();
var cfg = require("../config.js");


// conn
var connection = mysql.createPool({
    connectionLimit : 100,
    host: cfg.host,
    user: cfg.user,
    password: cfg.password,
    database: cfg.database
  })

// ROTAS //

// USER
router.get("/user", auth.authenticate(), function(req, res) {
    connection.query("SELECT id, login, firstname, lastname, admin FROM users\
        WHERE id = ?", req.user.id, function (err, result) {
          if (result)
          {      
            res.json(result[0]);
          }
          else
          {
            res.sendStatus(404)
          }
        });
  });
  
  // TOKEN
  router.post("/token", function(req, res) {
    if (req.body.login) 
    {
      connection.query("SELECT id, login, firstname, lastname, admin FROM users\
        WHERE login = ?", req.body.login, function (err, result) {
          if (result) 
          {
            var payload = result[0];
            var token = jwt.encode(payload, cfg.jwtSecret);
            res.json({token: token});
          } 
          else 
          {
            res.sendStatus(401);
          }
        })
    } 
    else 
    {
        res.sendStatus(401);
    }
  });