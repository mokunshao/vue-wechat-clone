const express = require("express");
const router = express.Router();
const passport = require("passport");
const Chat = require("../../models/Chat");

router.post(
  "/addmsg",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const chatFields = {};
    Chat.findOne({ target: req.body.target, user_id: req.body.user_id }).then(
      chat => {
        if (!chat) {
          if (req.body.target) chatFields.target = req.body.target;
          if (req.body.user_id) chatFields.user_id = req.body.user_id;
          if (req.body.count) chatFields.count = req.body.count;
          if (req.body.message) chatFields.message = req.body.message;
          new Chat(chatFields).save().then(chat => res.json(chat));
        } else {
          chat.message = req.body.message;
          chat.count = req.body.count;
          chat.save().then(chat => res.json(chat));
        }
      }
    );
  }
);

router.get(
  "/msg/:user_id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Chat.find()
      .then(chats => {
        if (!chats) {
          res.status(404).json("没有任何消息");
        }
        let result = chats.filter(chat => {
          return chat.user_id == req.params.user_id;
        });
        res.json(result);
      })
      .catch(err => res.status(404).json(err));
  }
);

module.exports = router;
