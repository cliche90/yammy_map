var express = require('express');
var request = require('request');

var app = express();
app.use(express.static(__dirname + "./static"));
app.set('view engine', 'jade');
app.set('views', 'views');

app.get('/yammy', (req, res) => {
    
    console.log('yammy')
    res.render('index');
});

app.listen(3000, () => { console.log("connected!!"); });
