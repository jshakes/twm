var Soundcloud = (function(){

  function soundcloud(opts){

    opts = opts || {};
    this.host = 'api.soundcloud.com';
    this.client_id = typeof(opts.client_id) == "string" ? opts.client_id : "ce00c34ab0935df23757e77d51e50b8a";
  }

  soundcloud.prototype.make_get = function(opts){

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
    params.client_id = this.client_id;

    var http_opts = {
      method: "GET",
      host: this.host,
      path: "/" + path + ".json" + (typeof(opts.params) != "undefined" ? "?" + querystring.stringify(opts.params) : "")
    }
    return http_opts;
  }

  /**
    * Query
    * Queries the Soundcloud track library with a query string
    * @param - req.query - the query string
  */
  soundcloud.prototype.query = function(query, callback_fn){

    http_opts = this.make_get({
      path: "tracks",
      params: {q: query}
    });
    request = require("./request.js");
    request(http_opts, callback_fn);
  }
  return soundcloud;
})();

module.exports = Soundcloud;