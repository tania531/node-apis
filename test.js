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

  if (req.url === "/") {
    // server index.html
    res.writeHead(200, {"Content-Type": "text/html"});
    fs.readFile('index.html', 'utf8', function (err,data) {
      res.end(data);
    });
  } else {
    res.writeHead(200, {"Content-Type": "text/plain"});
    request('http://points.agilelabs.com'+req.url+'.json', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        res.end(body);
      }
    });
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

  ///Counts/A Sentence here
  if (req.url.match("/Counts/")) {
      var count = req.url.match(/Counts\/(.*)/)[1];
      res.write(count.replace(/%20/g," ").length.toString());
      res.end();
  }


} // end handleRequest
