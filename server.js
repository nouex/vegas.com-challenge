"use strict";
const args = process.argv.slice(2);
const http = require('http');
const url = require('url');
const path = require('path');
const fs = require('fs');
const stat = promisify(fs.stat);
const exists = promisify(fs.exists);
const readFile = promisify(fs.readFile);
const simpleContentTypesByExt = {
    '.ico': 'image/x-icon',
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.json': 'application/json',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.svg': 'image/svg+xml'
};
const getContentTypeFromExt = ext => simpleContentTypesByExt[ext] || 'text/plain';

// default args
const defaultPort = 8888;
const defaultPublicLocation = path.join(__dirname, '..', 'public');

let port = args[0] || defaultPort;
let publicLocation = args[1] || defaultPublicLocation;

if(args.length) {
    if(!/^\d+$/.test(args[0])) {
        // then assume only public location was passed
        publicLocation = port;
        // set to default
        port = defaultPort;
    }
}

// store fully resolved public location
publicLocation = path.resolve(publicLocation);

function promisify(fn) {
    return function(arg) {
        return new Promise((resolve, reject) => {
            fn.call(this, arg, (err, value) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(value)
                }
            });
        });
    }
}

function appendExtension(filename, defaultExtension) {
    return path.extname(filename) ? filename : `${filename}${defaultExtension}`; 
}

function makeNotFoundResponse(err) {
    return {
        status: 404,
        body: JSON.stringify({ error: err || 'Not Found' })
    };
}

function makeSuccessResponse(body) {
    return {
        status: 200,
        body
    };
}

function handleRequest(req, res) {
    const uri = url.parse(req.url).pathname;
    // change default extension for api requests to json
    const defaultExtension = uri.indexOf('/api/') === -1 ? '.html' : '.json';

    // fullpath mutates in a few places below
    let fullpath = path.join(publicLocation, uri);
    const setPathAndStat = pathToStat => {
        fullpath = pathToStat;
        return stat(pathToStat);
    }

    console.info(`:: INFO :: -> Processing request for ${uri}`);
    console.info(`:: INFO :: -> Attempting to read ${fullpath}`)

    setPathAndStat(fullpath)
        .then(stats => {
            return stats.isDirectory() ?
                // assume that if this is a directory, then it might contain a file named index${defaultExtension}
                setPathAndStat(path.join(fullpath, 'index' + defaultExtension)).then(stats => fullpath) :
                fullpath;
        })

        // assuming the request failed because the extension is missing
        .catch(err => setPathAndStat(fullpath + defaultExtension).then(stats => fullpath))

        // finally read the file contents
        .then(readFile)

        // create success response object
        .then(makeSuccessResponse)
        
        // if anything broke, just send a 404 and pretend we couldn't find anything
        // nothing fancy, it's just a simple file server
        .catch(makeNotFoundResponse)

        // flush response
        .then(r => {
            const status = r.status;
            const isError = status === 404;
            const contentType = getContentTypeFromExt(isError ? '.json' : path.extname(fullpath));

            if(isError) {
                console.error(`:: ERROR :: <- Unable to read file at ${fullpath}`);
                console.error(`:: ERROR :: <- Request for ${uri} returned an error: ${r.body}.`);
            } else {
                console.log(`:: INFO :: <- Read file from ${fullpath}.`);
                console.log(`:: INFO :: <- Request for ${uri} successfully returned. Content type sent ${contentType}.`);
            }

            res.writeHead(status, { 'Content-Type': contentType });
            res.end(r.body);
        });
}

console.log(`
  _____   _____
  \\   _| |_   /
   \\  \\   /  /
    \\  \\ /  /
     \\  V  /   VEGAS.COM
      \\   /
       \\ /
        V

Starting simple static file server.
NOTE: When starting server, you may pass in 2 arguments. The first one is the port to use. The second one is where to serve files from.
      Example: node server 8888 ../public

`);

try {
    // Make sure we have access to the public location
    const stats = fs.statSync(publicLocation);

    if(!stats.isDirectory()) {
        console.error(':: ERROR :: Public location passed is not a directory');
        throw new Error();
    }

    // Simple file server to serve files
    http.createServer(handleRequest).listen(parseInt(port, 10));

    console.log(`

Running locally at http://localhost:${port}

 - Serving files from ${publicLocation}
 - Access API at http://localhost:${port}/api/hotels/venetian

Press ctrl + c to shutdown.
`);
} catch (ex) {
    console.error(`:: ERROR :: Unable to read from public directory located at ${publicLocation}`);
    console.error(`:: INFO :: Try running the app again with a valid public directory (second argument passed to script) `);
    process.exitCode = 1;
}