const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "邮箱已被占用" });
    }
    const avatar = gravatar.url(req.body.email, { s: "200", r: "g", d: "mm" });
    const newUser = new User({
      email: req.body.email,
      password: req.body.password,
      avatar
    });
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(newUser.password, salt, function(err, hash) {
        if (err) {
          throw err;
        }
        newUser.password = hash;
        newUser
          .save()
          .then(user => {
            res.json(user);
          })
          .catch(err => {
            throw err;
          });
      });
    });
  });
});

module.exports = router;
