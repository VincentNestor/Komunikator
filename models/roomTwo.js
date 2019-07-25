var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
  message: {type: String, required: true},
});
module.exports = mongoose.model('roomTwo', blogSchema);
