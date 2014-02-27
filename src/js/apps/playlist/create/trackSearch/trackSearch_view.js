TWM.module("Playlists.Create.TrackSearch", function(TrackSearch, TWM, Backbone, Marionette, $, _){
  
  TrackSearch.SearchResult = Marionette.ItemView.extend({
    template: "track-search-result",
    tagname: "li",
    className: "track-search-result",
    events: {
      "click .preview-track": "previewTrack",
      "click .add-track": "addTrack"
    },
    previewTrack: function(){

      // Play the middle 10 seconds of the song
    },
    addTrack: function(){

      // Add this track to the playlist and close the search modal
    }
  });

  TrackSearch.SearchResults = Marionette.CollectionView.extend({
    itemView: TrackSearch.SearchResult
  });
  
});