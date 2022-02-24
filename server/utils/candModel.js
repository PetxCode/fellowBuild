const mongoose = require("mongoose");
const candidateModel = mongoose.Schema(
  {
    name: {
      type: String
    },
    position: {
      type: String
    },
    point: {
      type: Number
    },
    avatar: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("candidates", candidateModel);
