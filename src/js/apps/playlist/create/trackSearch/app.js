TWM.module("Playlists.Create.TrackSearch", function(TrackSearch, TWM, Backbone, Marionette, $, _){
  
  // Declare a region to display our results in
  var resultsRegion = new Marionette.Region({
    el: ".track-search-results"
  });

  var newSearchQuery = function(query){

    var resultsCollection = TWM.request("newTrackSearch:entities", query);
    var resultsView = new TrackSearch.SearchResults({
      collection: resultsCollection
    });
    resultsRegion.show(resultsView);
    // Do the search, do it now
    resultsCollection.fetch();
  }

  TrackSearch.on("start", function(){

    // Bind the search form to a trackSearch object
    $(".track-search").on("submit", function(e){
      e.preventDefault();
      var query = $(this).find(".track-search-query").val();
      newSearchQuery(query);
    });
  });
  
});