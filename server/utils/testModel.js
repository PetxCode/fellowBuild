const mongoose = require("mongoose");
const testModel = mongoose.Schema(
  {
    name: {
      type: String
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model("tests", testModel);
