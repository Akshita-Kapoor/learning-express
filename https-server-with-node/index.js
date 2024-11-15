const http = require('http');

/* 
    createServer() function takes a callback function which process any incoming requests.
    callback function takes 2 arguments - req and res.

*/
const myServer = http.createServer((req, res) => {
    // req object has information that what the request is, what type of request is, (metadata) etc.
    res.end('Hello from server');
});

// port is like a door where this server will run

myServer.listen(8000, () => console.log('server started'));

