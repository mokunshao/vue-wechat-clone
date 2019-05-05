const mongoose = require("mongoose");

const momentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  img: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  imgs: {
    type: [String],
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

const Moment = mongoose.model("Moment", momentSchema);

module.exports = Moment;
