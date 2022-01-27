const http = require('http');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/html; charset=utf-8',
    });
    res.end('<h1>Lesson 5</h1>');

    if (req.url === '/') {
        //
    }
});

server.listen(port, () => {
    console.log(`Server is run on localhost:${port}`);
});
