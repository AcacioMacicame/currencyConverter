/**
 * this is the route app
 */
const express = require('express');
const path = require('path');
const app = express();

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, '/index.html'));
});

/**
 * here we set static files
 */
app.use(express.static(__dirname + '/public'));

/**
 * this is the listenner to start server
 */
app.listen(8080, function() {
    console.log('Example app listening on port 8080!');
});