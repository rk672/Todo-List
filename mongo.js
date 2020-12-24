var mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name : String,
    isChecked : Boolean
});

var Data = mongoose.model("Data",schema);

module.exports = Data;