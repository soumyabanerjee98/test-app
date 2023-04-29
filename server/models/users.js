const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Users", UserSchema);
