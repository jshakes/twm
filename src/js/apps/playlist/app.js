TWM.module("Playlist", function(Playlist, TWM, Backbone, Marionette, $, _){
  
  // prevent starting with parent
  this.startWithParent = false;
  
  Playlist.API = {
    /**
    * Load Player
    * Given a collection of playlist tracks, this function embeds the relevant HTML player into the page
    * @param playlist (obj) - A Backbone Collection containing the tracks to play
    */
    loadPlayer: function(playlist){

      var tracks = [];
      for(track in playlist.models){

        tracks.push(track.attributes);
      }
      var playlistManager = TWM.request("playlistManager:components", {
        tracks: tracks
      });
    }
  }

  Playlist.on("start", function(){  
    
    var tracks = bootstrap || {};
    var playlist = TWM.request("newPlaylist:entities", tracks);
    Playlist.API.loadPlayer(playlist);
  });
});