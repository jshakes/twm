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