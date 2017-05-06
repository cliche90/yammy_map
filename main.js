var express = require('express');
var request = require('request');
var path = require('path');
path.dirname('/views');

var app = express();
app.use(express.static(__dirname + "./static"));
app.set('view engine', 'jade');
app.set('views', 'views');

app.get('/yammy', (req, res) => {
    console.log('yammy')
    res.sendFile(path.join(__dirname + '/views/index.html'));
});

app.listen(3000, () => { console.log("connected!!"); });
