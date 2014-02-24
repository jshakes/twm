TWM.module("Playlists.Create.TrackSearch", function(Playlists, TWM, Backbone, Marionette, $, _){
  
  // Declare a region to display our results in
  var resultsRegion = Marionette.Region.extend({
    el: ".track-search-results"
  });

  var newSearchQuery = function(query){

    var resultsCollection = TwM.req("newTrackSearch:entities", query);
    var resultsView = new SearchResults({
      collection: resultsCollection
    });
    resultsRegion.show(resultsView);
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