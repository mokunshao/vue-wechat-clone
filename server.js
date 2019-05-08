const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const keys = require("./config/keys");
const user = require("./routes/api/user");
const User = require("./models/User");
const Moment = require("./models/Moment");
const moment = require("./routes/api/moment");
const bodyParser = require("body-parser");
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

app.use(passport.initialize());

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrPrivateKey;

passport.use(
  new JwtStrategy(opts, (jwt_payload, done) => {
    User.findById(jwt_payload.id, (err, res) => {
      if (err) {
        return done(err, false);
      }
      if (res) {
        return done(null, res);
      } else {
        return done(null, false);
      }
    });
  })
);

app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.use(bodyParser.json({ limit: "50mb" }));

app.use("/api/user", user);
app.use("/api/moment", moment);

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(error => {
    throw error;
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
