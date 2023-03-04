const { Schema, model } = require("mongoose");
const UserSchema = new Schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: String,
});

const UserModel = model("user", UserSchema);
module.exports = UserModel;
