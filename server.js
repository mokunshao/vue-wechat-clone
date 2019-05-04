const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const keys = require("./config/keys");
const user = require("./routes/api/user");
const User = require("./models/User");
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

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/user", user);

app.get("/", passport.authenticate("jwt", { session: false }), (req, res) => {
  res.json({ msg: req.user });
});

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
