TWM.module("Playlist.Create.TrackSearch", function(TrackSearch, TWM, Backbone, Marionette, $, _){
  
  TrackSearch.SearchResult = Marionette.ItemView.extend({
    template: "track-search-result",
    tagname: "li",
    className: "track-search-result",
    events: {
      "click .preview-track": "previewTrack",
      "click .track-search-result-add": "addTrack"
    },
    previewTrack: function(){

      // Play the middle 10 seconds of the song
    },
    addTrack: function(e){

      e.preventDefault();
      var trackIndex = $(".playlist-track-select:checked").data("index");
      var fields = ["id", "source", "title", "url", "artwork", "duration"];

      for(var i = 0; i < fields.length; i++){

        var field = fields[i];
        var $el = $("#track-" + trackIndex + "-" + field);
        if(this.model.get(field) && $el.length){
          $el.val(this.model.get(field));
        }
      }
    }
  });

  TrackSearch.SearchResults = Marionette.CollectionView.extend({
    itemView: TrackSearch.SearchResult
  });
  
});