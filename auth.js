// auth.js
var passport = require("passport");
var passportJWT = require("passport-jwt");
let mysql = require("mysql")
var cfg = require("./config.js");
var ExtractJwt = passportJWT.ExtractJwt;
var Strategy = passportJWT.Strategy;
var params = {
  secretOrKey: cfg.jwtSecret,
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
};


// conn
var connection = mysql.createPool({
  connectionLimit : 100,
  host: cfg.host,
  user: cfg.user,
  password: cfg.password,
  database: cfg.database
})

module.exports = function() {
  var strategy = new Strategy(params, function(payload, done) {
      connection.query("SELECT id, login, firstname, lastname, admin FROM users\
          WHERE id = ?", payload.id, function (err, result) {
            if (result) {
              return done(null, result[0]);
              
            } else {
              return done(new Error("User not found"), null);
            }
          })
  });

  passport.use(strategy);
  return {
    initialize: function() {
      return passport.initialize();
    },
    authenticate: function() {
      return passport.authenticate("jwt", cfg.jwtSession);
    }
  };
};