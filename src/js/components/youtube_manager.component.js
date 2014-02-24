MS.module("Components", function(Components, Fortune, Backbone, Marionette, $, _){

  MS.Components.Youtube_Manager = (function(){

    function Youtube_Manager = function(opts){

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