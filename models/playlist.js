var mongoose = require('mongoose')
mongoose.connect('mongodb://127.0.0.1/twm');

var schema = new mongoose.Schema({
  title: String,
  created: Date,
  tracks: [{
    trackId: String,
    source: String,
    title: String,
    artwork: String,
    duration: Number
  }]
})

module.exports = mongoose.model('Playlist', schema);