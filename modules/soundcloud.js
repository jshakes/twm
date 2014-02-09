var Soundcloud = (function(){

  function soundcloud(opts){

    opts = opts || {};
    this.host = 'api.soundcloud.com';
    this.client_id = typeof(opts.client_id) == "string" ? opts.client_id : "ce00c34ab0935df23757e77d51e50b8a";
    this.client_secret = typeof(opts.client_secret) == "string" ? opts.client_secret : "783f7718a36d293b97c513c0f7fe0c6a";
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
    console.log(path);

    // Append the client ID to the params
    params = opts.params || {};
    params.client_id = this.client_id;

    var http_opts = {
      method: "GET",
      client_id: this.client_id,
      host: this.host,
      path: "/" + path + ".json" + (typeof(opts.params) != "undefined" ? "?" + querystring.stringify(opts.params) : "")
    }
    console.log(http_opts);
    return http_opts;
  }

  soundcloud.prototype.make_request = function(http_opts, callback_fn){

    var http, req;

    http = require("http");

    req = http.request(http_opts, function(res){
      res.setEncoding('utf8');
      var data = '';
      res.on('data', function(d) {
        data += d;
      });
      res.on('end', function() {
        try {
          data = JSON.parse(data);
        } catch (e) {
          console.log('non-json response');
        }
        callback_fn(data);
      });
    });
    req.end();
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
    this.make_request(http_opts, callback_fn);
  }
  return soundcloud;
})();

module.exports = Soundcloud;