var Youtube = (function(){

  function youtube(opts){

    opts = opts || {};
    this.host = "gdata.youtube.com";
    this.limit = typeof(opts.limit) == "number" ? opts.limit : 50;
    this.api_key = typeof(opts.api_key) == "string" ? opts.api_key : "AIzaSyDwdE-96BL1ksJUUpKumED4MdlyRelyc_4";
  }

  youtube.prototype.make_get = function(opts){

    var path, params, querystring;
    querystring = require("querystring");

    try{
      path = opts.path
    }
    catch(e){
      console.error("make_get: path must be defined");
    }

    params = opts.params || {};
    // Append the api key to the params
    params.key = this.api_key;
    // Specify the response type
    params.alt = "json";
    // Set the result limit
    params.limit = this.limit;

    var http_opts = {
      method: "GET",
      host: this.host,
      path: "/feeds/api/videos" + (typeof(opts.params) != "undefined" ? "?" + querystring.stringify(opts.params) : "")
    }
    return http_opts;
  }

  youtube.prototype.sort_results = function(data){

    var clean_data = new Array();
    var videos = data.feed.entry;
    for (key in videos) {
      
      var video, result = {};

      // Extract the data we want for the feed
      video = videos[key];
      result.url = video.link[0].href;
      result.source = "youtube";
      result.title = video.title.$t;
      result.duration = video.media$group.media$content[0].duration;
      result.thumbnail = video.media$group.media$thumbnail[0].url;
      // Push the result to the clean_data array
      clean_data.push(result);
    }
    return clean_data;
  }

  youtube.prototype.query = function(query, callback_fn){

    var _this = this;
    http_opts = this.make_get({
      params: {
        "q": query
      }
    });
    request = require("./request.js");
    request(http_opts, function(data){

      clean_data = _this.sort_results(data);
      callback_fn(clean_data);
    });
  }

  return youtube;
})();

module.exports = Youtube;