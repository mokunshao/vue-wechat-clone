const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const chatSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },
  count: {
    type: Number
  },
  user_id: {
    type: String,
    required: true
  },
  message: [
    {
      source: {
        type: String,
        required: true
      },
      msg: {
        type: String,
        required: true
      }
    }
  ],
  target: {
    avatar: {
      type: String
    },
    username: {
      type: String,
      required: true
    },
    _id: {
      type: String,
      required: true
    }
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Chat = mongoose.model("Chat", chatSchema);
