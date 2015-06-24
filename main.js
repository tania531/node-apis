var fs = require("fs"),
    http = require("http"),
    request = require('request'),
    url = require('url'),
    exec = require("child_process").exec;

http.createServer(responseHandler).listen(8888);

function responseHandler(req, res) {
  if (req.url.match("fav")) {
    res.end("");
    return;
  }

  //calc
  if (req.url.match("/Calc/")) {
      var calc = eval(req.url.match(/Calc\/(.*)/)[1]);
      res.write(calc.toString());
      res.end();
  }

    ///gravatarUrl/samer.buna@gmail.com
  if (req.url.match("/gravatarUrl/")) {
    var md5 = require('MD5');
    var grav = md5(req.url.match(/gravatarUrl\/(.*)/)[1]);
    res.write("http://www.gravatar.com/avatar/"+grav);
    res.end();

  }

  ///Counts/A Sentence here '{"letters":15,"spaces":2,"words":6}'
  if (req.url.match("/Counts/")) {
    var results = {};
      var count = req.url.match(/Counts\/(.*)/)[1];
      results.letters = count.replace(/%20/g," ").length.toString();
      results.words = count.match(/\w+/g).length;
      results.spaces = results.words - 1;
      res.write(JSON.stringify(results));
      res.end();
  }

} // end handleRequest
