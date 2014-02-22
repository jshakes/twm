var mongoose = require('mongoose')
mongoose.createConnection('mongodb://localhost/track_with_me');

var schema = new mongoose.Schema({
  title: String,
  date: Date,
  song1: String,
  song2: String,
  song3: String
})

module.exports = mongoose.model('Playlist', schema);