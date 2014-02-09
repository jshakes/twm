exports.index = function(req, res){

  Soundcloud = require("../modules/soundcloud.js");
  soundcloud = new Soundcloud();
  var query = "darkside";
  soundcloud.query(query, function(data){

    res.send({
      data: data
    });
  });
};

