const { Schema, model } = require("mongoose");

const sanction = new Schema({
  _id: { type: Schema.ObjectId, auto: true },
  _userid: { type: String },
  _username: { type: String },
  _serverid: { type: String },
  _reason: { type: String },
});

module.exports = model("sanction", sanction);
