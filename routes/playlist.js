exports.new_playlist = function(req, res){

  res.render("new-playlist");
};

exports.process_new_playlist = function(){

  var Playlist = require("../models/playlist.js");
}