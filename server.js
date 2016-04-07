var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var auth           = require('./resources/auth');
var port           = process.env.PORT || 3000;

var uri            = process.env.MONGOLAB_URI || "mongodb://localhost/Perseus";

require('dotenv').load();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

mongoose.connect(uri);

var routes = require('./config/routes');

app.use(routes);


app.get(['*', '/', '/signup', '/login', '/search'], function (req, res) {
  res.render('index');
});

app.listen(port, function(){
  console.log("Let's Marvin Gaye and get it on at port", port);
});
