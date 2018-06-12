var path = require('path');
var express = require('express');
var html = require('./html');
var app = express();

const PORT = 8889;

function start(statsData, moduleId) {
    app.get('/', function (req, res) {
        res.send(html({ title: `Dependency graph for ${moduleId}`}));
      });
    
    app.get('/stats', (req, res) => {
        res.json({ stats: statsData, moduleId });
    });

    app.use(express.static(path.join(__dirname, './frontend')));

    app.listen(PORT, function () {
        console.log(`app listening on  http://localhost:${PORT}`);
    });

    return `http://localhost:${PORT}`;
}

module.exports = start;