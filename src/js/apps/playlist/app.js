TWM.module("Playlist", function(Playlist, TWM, Backbone, Marionette, $, _){

  Playlist.on("start", function(){  
    
    var tracks = bootstrap || {};
    var playlist = TWM.request("newPlaylist:entities", tracks);
  });

});