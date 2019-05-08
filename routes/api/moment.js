const express = require("express");
const router = express.Router();
const Moment = require("../../models/Moment");
const passport = require("passport");

// @route POST /api/moment/add
// @desc 添加朋友圈动态
// @access private
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const dataFromUser = {};
    if (req.body.avatar) {
      dataFromUser.avatar = req.body.avatar;
    }
    if (req.body.username) {
      dataFromUser.username = req.body.username;
    }
    if (req.body.text) {
      dataFromUser.text = req.body.text;
    }
    if (req.body.imgs) {
      dataFromUser.imgs = req.body.imgs.split("|");
    }
    new Moment(dataFromUser).save().then(moment => {
      res.json(moment);
    });
  }
);

// @route GET /api/moment/latest
// @desc 获取朋友圈动态
// @access private
// 下拉更新3条
router.get(
  "/latest",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Moment.find()
      .sort({ date: -1 })
      .then(moments => {
        if (!moments) {
          res.status(404).json({ msg: "没有任何消息" });
        } else {
          let newData = [];
          for (let i = 0; i < 3; i++) {
            if (moments[i]) {
              newData.push(moments[i]);
            }
          }
          res.json(newData);
        }
      });
  }
);

// @route GET /api/moment/latest
// @desc 获取朋友圈动态
// @access private
router.get(
  "/:page/:size",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Moment.find()
      .sort({ date: -1 })
      .then(moments => {
        if (!moments) {
          res.status(404).json("没有任何消息");
        } else {
          let page = req.params.page;
          let size = req.params.size;
          let index = size * (page - 1);
          let newMoments = [];
          for (let i = index; i < size * page; i++) {
            if (moments[i]) {
              newMoments.push(moments[i]);
            }
          }
          res.json(newMoments);
        }
      });
  }
);

module.exports = router;
