const mongoose = require("mongoose");
const Schema = mongoose.Schema;
//mongoose.set("debug", true);

const userSchema = new Schema({
    userEmail: { type: String, required: true },
    userPassWord: { type: String, required: true},
    userCreated: { type: Date, default: Date.now }
});

const User = mongoose.model("User", userSchema);

module.exports = User;
