var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/twm');

var schema = new mongoose.Schema({
  title: String,
  created: Date,
  tracks: [{
    trackId: String,
    trackSource: String
  }]
})

module.exports = mongoose.model('Playlist', schema);