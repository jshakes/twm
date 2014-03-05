TWM.module("Components", function(Components, Fortune, Backbone, Marionette, $, _){

  TWM.Components.PlaylistManager = (function(){

    function PlaylistManager(data){

    }

    return PlaylistManager;

  })();

  TWM.reqres.setHandler("playlistManager:components", function(data){ 
    
    return new Components.PlaylistManager(data);
  });

});