TWM.module("Playlist.Create.TrackSearch", function(TrackSearch, TWM, Backbone, Marionette, $, _){
  
  TrackSearch.SearchResult = Marionette.ItemView.extend({
    template: "track-search-result",
    tagname: "li",
    className: "track-search-result",
    events: {
      "click .preview-track": "previewTrack",
      "click .track-search-result-add": "addTrack"
    },
    previewTrack: function(e){

      e.preventDefault();
      this.pop = TrackSearch.Controller.previewTrack(this.model, 15);
    },
    stopPreview: function(e){

      e.preventDefault();
      TrackSearch.Controller.stopTrackPreview(this.pop);
    },
    addTrack: function(e){

      e.preventDefault();
      TrackSearch.Controller.addTrack(this.model);
    }
  });

  TrackSearch.SearchResults = Marionette.CollectionView.extend({
    itemView: TrackSearch.SearchResult
  });
  
});