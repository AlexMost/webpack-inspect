var fs = require("fs");
var path = require("path");
var express = require("express");
var html = require("./html");
var app = express();

const PORT = 8889;

function start(statsPath) {
  app.get("/", function(req, res) {
    res.send(html({ title: `Dependency graph` }));
  });

  app.get("/stats", (req, res) => {
    const statsData = JSON.parse(fs.readFileSync(statsPath));
    res.json({ stats: statsData });
  });

  app.use(express.static(path.join(__dirname, "./dist")));

  app.listen(PORT, function() {
    console.log(`app listening on  http://localhost:${PORT}`);
  });

  return `http://localhost:${PORT}`;
}

module.exports = start;
