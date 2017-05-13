var $ = require('jquery');
var pug = require('pug');
var request = require('request');
var express = require('express');

var app = express();
app.use(express.static(__dirname + "/static"));
app.set('view engine', 'pug');
app.set('views', 'views');

app.get('/yammy', (req, res) => {
    console.log('yammy');
    res.render('template', {
        clientId: "Fr6pjBddAuO8TE0g0nP9"
    });
});

app.listen(3000, () => console.log("connected!!") );
