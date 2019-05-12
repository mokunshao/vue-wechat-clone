const express = require("express");
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcrypt");
const gravatar = require("gravatar");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require('passport');

router.post("/register", (req, res) => {
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "邮箱已被占用" });
    }
    const avatar = gravatar.url(req.body.email, { s: "200", r: "g", d: "mp" });
    const newUser = new User({
      username: req.body.username,
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
        const payload = {
          id: user.id,
          email: user.email,
          avatar: user.avatar,
          username: user.username
        };
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

router.get(
  '/all',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    User.find()
      .then(users => {
        if (!users) {
          errors.noprofile = '没有任何用户信息';
          return res.status(404).json(errors);
        }
        const newUsers = [];
        for (let i = 0; i < users.length; i++) {
          let usersObj = {};
          usersObj = {
            username: users[i].username,
            _id: users[i]._id,
            email: users[i].email,
            avatar: users[i].avatar,
            date: users[i].date
          };
          newUsers.push(usersObj);
        }

        res.json(newUsers);
      })
      .catch(err => res.status(404).json({ users: '没有任何用户信息' }));
  }
);

router.get(
  '/:user_id',
  passport.authenticate('jwt', { session: false }),
  (req, res) => {
    const errors = {};
    User.findOne({ _id: req.params.user_id })
      .populate('user', ['name', 'avatar'])
      .then(user => {
        if (!user) {
          errors.nouser = '未找到该用户信息';
          res.status(404).json(errors);
        }
        let usersObj = {};
        usersObj = {
          name: user.name,
          _id: user._id,
          email: user.email,
          avatar: user.avatar,
          date: user.date
        };
        res.json(usersObj);
      })
      .catch(err => res.status(404).json(err));
  }
);

// User.db.dropCollection('users')

// User.find().then(data => {
//   console.log(data);
// });

module.exports = router;
