const fs = require('fs');
const opn = require('opn');
const start = require('./server');


function discover(statsPath) {
    const host = start(statsPath);
    if (process.env.NODE_ENV !== 'development') {
        opn(host);
    }
}


discover(process.argv[2]);
