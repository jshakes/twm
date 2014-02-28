TWM = new Marionette.Application();

TWM.on("initialize:after", function(){

  console.log("Application started");
});
Backbone.Marionette.Renderer.render = function(templateId, data){
  
  var template = TWM.templates[templateId];
  var html = ejs.render(template, data);
  return html;
}
TWM.module("Playlists", function(Playlists, TWM, Backbone, Marionette, $, _){
  
});
TWM.module("Playlists", function(Playlists, TWM, Backbone, Marionette, $, _){
  
  
  
});
TWM.module("Playlists.Create", function(Playlists, TWM, Backbone, Marionette, $, _){
  
  
  
});
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
TWM.module("Components", function(Components, Fortune, Backbone, Marionette, $, _){

  TWM.Components.Youtube_Manager = (function(){

    function Youtube_Manager(opts){

    }

    /**
     * Create a 1px square iframe to embed the player with
    */
    Youtube_Manager.prototype.embed = function(video_id) {

      var $html, src;
      src = "//www.youtube.com/embed/" + video_id + "?rel=0&autoplay=1";
      $html = $("<iframe></iframe>");
      $html.attr("width", 1).attr("height", 1).attr("frameborder", 0);
      $html.attr("src", src);
      return $html;
    };

    return Youtube_Manager;

  })();

  Fortune.reqres.setHandler("youtube_manager:components", function(data){ 
    
    return new Components.InfiniteScroll(data);
  });

});
TWM.module("Entities", function(Entities, TWM, Backbone, Marionette, $, _){

  // Search result
  Entities.trackSearchResult = Backbone.Model.extend({
    /*
    * Parse the response and add a human-readable 'minutes' value for the duration
    */
    parse: function(response){
      response.minutes = this.secondsToMinutes(response.duration)
      return response;
    },
    /*
    * Convert seconds to human-readable minutes
    */
    secondsToMinutes: function(seconds){
      var minutes = Math.floor(seconds / 60);
      var remainderSeconds = Math.round(seconds - minutes * 60);
      return minutes + ":" + remainderSeconds;
    }
  });

  // Search result collection
  Entities.trackSearchResults = Backbone.Collection.extend({
    model: Entities.trackSearchResult,
    baseUrl: "/search/",
    query: "",
    url: function(){
      return this.baseUrl + "?q=" + this.query;
    },
    /**
    * Set Query
    *
    * If the new query does not match the old one, update this.query and make a
    * one-time listener to empty any old results when we next sync
    */
    setQuery: function(query){
      if(this.query != query){
        this.query = query;
        this.listenToOnce(this, "request", function(){

          this.reset();
        });
      }
    }
  });

  var API = {
    /**
    * New Track Search
    *
    * Create a new trackSearchResults object, set the query term if there is one and return the object
    * @param query (string) - Optional string to use as the query term for the new search results
    */
    newTrackSearch: function(query){

      var trackSearchResults = new Entities.trackSearchResults();
      if(typeof(query) == "string"){
        trackSearchResults.setQuery(query);
      }
      return trackSearchResults;
    }
  }

  // Set our req/res handlers

  TWM.reqres.setHandler("newTrackSearch:entities", function(query){ 
    
    return API.newTrackSearch(query);
  });

});