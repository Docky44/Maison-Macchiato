const { Schema, model } = require("mongoose");

const guild = new Schema({
    _id: {type: String},
});

module.exports = model('guild', guild)