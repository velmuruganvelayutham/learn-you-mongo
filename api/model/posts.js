var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    name: String,
    content: String,
    description: String

});

module.exports = mongoose.model('Posts', PostSchema);
