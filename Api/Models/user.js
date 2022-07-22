const mongoose = require("mongoose");
const timestamps = require("mongoose-timestamp");
const movie = require("./movie");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  Username: { type: String, required: true },
  email: {
    type: String,
    required: false,
    unique: true,
    match:
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
  },
  password: { type: String, required: false },
  top100movies: [{ type: mongoose.Schema.Types.ObjectId, ref: movie }],
});
productSchema.plugin(timestamps);

module.exports = mongoose.model("user", userSchema);
