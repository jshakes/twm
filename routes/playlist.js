var Playlist = require("../models/playlist.js");

exports.new_playlist = function(req, res){

  res.render("new-playlist");
};

exports.process_new_playlist = function(req, res){

  // Build the new playlist object from the POST data
  var newPlaylist = {
    title: req.body.title,
    created: Date.now()
  }
  // Get the track info (0, 1, 2)
  var playlistTracks = [];
  for(var i = 0; i <= 2; i++){
    var track = {
      trackId: req.body["track" + i + "id"],
      trackSource: req.body["track" + i + "source"]
    }
    playlistTracks.push(track);
  }

  newPlaylist.tracks = playlistTracks;

  // Write it to the database, then redirect to that track page
  var playlistRow = new Playlist(newPlaylist);

  playlistRow.save(function (err) {

    if (err) return next(err);
    res.redirect("/playlist/" + playlistRow._id);
    console.log(playlistRow);

  });
}

exports.playlist = function(req, res){

  Playlist.findOne({id: req.params.playlist}, function(err, playlist){

    if (err) return next(err);
    console.log("queried" + playlist);
    res.render("playlist", playlist);
  });
}