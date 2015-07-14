// load mongoose since we need it to define a model
var mongoose = require('mongoose');

// define Player model
// and export it to other files when it's called
module.exports = mongoose.model('Player', {
    text : String,
    identifier : String,
    level : String
});