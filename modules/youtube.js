var Youtube = (function(){

  function youtube(opts){

    opts = opts || {};
    this.host = "gdata.youtube.com";
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

    // Append the client ID to the params
    params = opts.params || {};
    params.key = this.api_key;
    params.alt = "json";

    var http_opts = {
      method: "GET",
      host: this.host,
      path: "/feeds/api/videos" + (typeof(opts.params) != "undefined" ? "?" + querystring.stringify(opts.params) : "")
    }
    return http_opts;
  }

  youtube.prototype.query = function(query, callback_fn){

    http_opts = this.make_get({
      params: {
        "q": query,
        "max-results": 10
      }
    });
    request = require("./request.js");
    request(http_opts, callback_fn);
  }

  return youtube;
})();

module.exports = Youtube;