exports.index = function(req, res){

  Soundcloud = require("../modules/soundcloud.js");
  soundcloud = new Soundcloud();
  var query = "darkside";

  Youtube = require("../modules/youtube.js");
  youtube = new Youtube();

  youtube.query(query, function(data){

    res.send({
      data: data
    });
  });
};

