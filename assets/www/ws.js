var express = require('express'),
    app = express();

app.get('/js/*', express.static(__dirname));
app.get('/styles/*', express.static(__dirname));
app.get('*', function (req, res) {
    console.log('serving index.html for route: ', req.url);
    res.sendfile('index.html');
});
app.listen(5000);
