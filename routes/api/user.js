const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "邮箱已被占用" });
    }
    const avatar = gravatar.url(req.body.email, { s: "200", r: "g", d: "mp" });
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

router.post("/login", (req, res) => {
  const email = req.body.email;
  const password = req.body.password;
  User.findOne({ email }).then(user => {
    if (!user) {
      return res.status(404).json({ msg: "用户不存在" });
    }
    bcrypt.compare(password, user.password, (err, same) => {
      if (err) {
        throw err;
      }
      if (same) {
        const payload = { id: user.id, email: user.email, avatar: user.avatar };
        jwt.sign(
          payload,
          keys.secretOrPrivateKey,
          { expiresIn: 3600 },
          (err, token) => {
            if (err) {
              throw err;
            }
            res.json({ token: "bearer " + token });
          }
        );
      } else {
        res.status(400).json({ msg: "密码错误" });
      }
    });
  });
});

// User.db.dropCollection('users')

// User.find().then(data => {
//   console.log(data);
// });

module.exports = router;
