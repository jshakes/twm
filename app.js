/*
============================================
Dependencies
============================================
*/
var routes = require("./routes");
var engine = require("ejs-locals");

/*
============================================
Server
============================================
*/
var express = require("express");
var app = express();
var server = app.listen(3000);
console.log("Express server listening on port 3000");

app.configure(function(){

  // Set up the template engine
  app.engine("ejs", engine);
  app.set("view engine", "ejs");
  // Serve static files from /public
  app.use(express.static(__dirname + "/public"));
  // Use URLencoded for post data
  app.use(express.urlencoded());
});
/*
============================================
Routes
============================================
*/

app.get("/", routes.home.home);
app.get("/search", routes.search.search_by_string);
app.get("/new-playlist", routes.playlist.new_playlist);
app.post("/process-new-playlist/", routes.playlist.process_new_playlist);
app.get("/playlist/:id", routes.playlist.playlist);