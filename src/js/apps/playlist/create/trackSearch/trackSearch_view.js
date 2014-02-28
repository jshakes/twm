TWM.module("Playlists.Create.TrackSearch", function(TrackSearch, TWM, Backbone, Marionette, $, _){
  
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
      var $trackIdInput = $("#track-" + trackIndex + "-id");
      var $trackIdSource = $("#track-" + trackIndex + "-source");
      var $trackIdPlaceholder = $("#track-" + trackIndex + "-placeholder");
      // Add this track to the currently selected track slot
      $trackIdInput.val(this.model.get("id"));
      $trackIdSource.val(this.model.get("source"));
      // Show the track info in the placeholder
      $trackIdPlaceholder.val(this.model.get("title"));
    }
  });

  TrackSearch.SearchResults = Marionette.CollectionView.extend({
    itemView: TrackSearch.SearchResult
  });
  
});