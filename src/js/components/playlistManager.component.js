TWM.module("Components", function(Components, TWM, Backbone, Marionette, $, _){

  TWM.Components.PlaylistManager = (function(){

    function PlaylistManager(data){

      this.tracks = data.tracks || {};
      this.currentTrack = typeof(data.currentTrack) == "number" ? data.currentTrack : 0;
      // Create a jQuery element that will contain our embed codes and append it to the body
      this.embedsId = "playlist-embeds";
      this.$embeds = $("<div></div>").attr("id", this.embedsId).appendTo("body");
    }

    PlaylistManager.prototype.startPlaylist = function() {

      this.playTrack(0);
    };

    PlaylistManager.prototype.playTrack = function(trackIndex) {

      var track, pop;
      this.$embeds.html("");
      track = this.tracks[trackIndex];
      pop = this.getPopcorn(track.url);
      pop.play();
    };

    PlaylistManager.prototype.getPopcorn = function(trackUrl) {

      var pop = Popcorn.smart( "#" + this.embedsId, trackUrl);
      return pop;
    };

    return PlaylistManager;

  })();

  TWM.reqres.setHandler("playlistManager:components", function(data){ 
    
    return new Components.PlaylistManager(data);
  });

});