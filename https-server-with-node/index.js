const http = require('http');
const fs = require('fs');

/* 
    createServer() function takes a callback function which process any incoming requests.
    callback function takes 2 arguments - req and res.
*/
const myServer = http.createServer((req, res) => {
    // req object has information that what the request is, what type of request is, (metadata) etc.
    const log = `${Date.now()}: ${req.url} New request received\n`;
    fs.appendFile("log.txt", log, (err, data) => {
        switch(req.url) {
            case '/': res.end('Home page');
            break;
            case '/about': res.end('About page');
            break;
            default: res.end('Not found');
        }
    });
});

// port is like a door where this server will run

myServer.listen(8000, () => console.log('server started'));

