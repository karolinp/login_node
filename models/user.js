'use strict'

var moongose = require("mongoose");
var Schema = moongose.Schema;

var UserSchema = Schema ({
    empresa : String,
    email : String,
    password : String,
});

module.exports = moongose.model('User', UserSchema);