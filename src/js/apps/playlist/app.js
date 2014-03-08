TWM.module("Playlist", function(Playlist, TWM, Backbone, Marionette, $, _){
  
  // prevent starting with parent
  this.startWithParent = false;

  /**
  * Bind Playlist UI
  *
  * Binds DOM elements to methods in the given playlistManager object
  *
  * @param playlistManager (obj) - A playlist manager object
  */
  var bindPlaylistUi = function(playlistManager){

    $(".playlist-toggle-play").on("click", function(){

      playlistManager.togglePlayPause();
      console.log("Now playing " + playlistManager.getCurrentTrackData().title);
    });

    $(".playlist-next").on("click", function(){

      playlistManager.next();
      console.log("Now playing " + playlistManager.getCurrentTrackData().title);
    });
    $(".playlist-prev").on("click", function(){

      playlistManager.previous();
      console.log("Now playing " + playlistManager.getCurrentTrackData().title);
    });
  }
  
  Playlist.API = {
    /**
    * Load Player
    *
    * Given a collection of playlist tracks, this function creates a new playlistManager object for controlling the playback of tracks
    *
    * @param playlist (obj) - A Backbone Collection containing the tracks to play
    * @return playlistManager (obj) - An object created from the playlistManager component class
    */
    loadPlayer: function(playlist){

      var tracks = [];
      for(key in playlist.models){

        var track = playlist.models[key];
        tracks.push(track.attributes);
      }
      var playlistManager = TWM.request("playlistManager:components", {
        tracks: tracks
      });
      return playlistManager;
    }
  }

  Playlist.on("start", function(){  
    
    var tracks = bootstrap || {};
    var playlist = TWM.request("newPlaylist:entities", tracks);
    // create a new playlist manager from the API.loadPlayer method
    var playlistManager = Playlist.API.loadPlayer(playlist);
    // bind controls to the new playlist manager object
    bindPlaylistUi(playlistManager);
  });
});