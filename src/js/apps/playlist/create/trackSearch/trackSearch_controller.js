TWM.module("Playlist.Create.TrackSearch", function(TrackSearch, TWM, Backbone, Marionette, $, _){

  TrackSearch.Controller = {
    previewTrack: function(trackModel, previewDuration){

      var trackUrl = trackModel.get("url");
      var trackDuration = trackModel.get("duration");
      // Find the preview start and end times
      var previewStart = Math.round(trackDuration / 2 - (previewDuration / 2));
      var previewEnd = Math.round(previewStart + previewDuration);
      // Create an $el to load our popcorn object into, if it doesn't already exist
      if(!$("#preview-embeds").length){
        $("<div></div>").attr("id", "preview-embeds").appendTo("body");
      }
      else{
        // If the $el already exists, empty it
        $("#preview-embeds").html("");
      }
      // Create the popcorn object and disable autoplay
      var pop = Popcorn.smart( "#preview-embeds", trackUrl);
      pop.autoplay(false);
      // Play the track
      if(trackModel.get("source") == "soundcloud") {
        pop.on( "canplaythrough", function( event ) {
          pop.play();
        });
        pop.on( "timeupdate", function( event ) {
          pop.off("timeupdate");
          pop.pause().mute().currentTime(0);
          var scTimeout = window.setTimeout(function(){
            pop.unmute().currentTime(previewStart).play();
          }, 2000);
        });
      }
      else {
        pop.mute();
        pop.play();
        pop.on( "canplayall", function( event ) {
          pop.currentTime(previewStart);
          pop.unmute();
        });
      }
      // Stop the preview at previewEnd
      pop.exec(previewEnd, function(){ 
        pop.destroy();
      });
      return pop;
    },
    stopTrackPreview: function(popcornObject){

      popcornObject.destroy();
    },
    addTrack: function(trackModel){

      var trackIndex = $(".playlist-track-select:checked").data("index");
      var fields = ["id", "source", "title", "url", "artwork", "duration"];

      for(var i = 0; i < fields.length; i++){

        var field = fields[i];
        var $el = $("#track-" + trackIndex + "-" + field);
        if(trackModel.get(field) && $el.length){
          $el.val(trackModel.get(field));
        }
      }
    }
  }

});