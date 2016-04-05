var express        = require('express');
var app            = express();
var bodyParser     = require('body-parser');
var mongoose       = require('mongoose');
var methodOverride = require('method-override');
var auth           = require('./resources/auth');



require('dotenv').load();

app.use(bodyParser.urlencoded({extended: true}));

app.use(bodyParser.json());

app.use(express.static(__dirname + '/public'));

app.set('view engine', 'hbs');

mongoose.connect('mongodb://localhost/Perseus');

var routes = require('./config/routes');

app.use(routes);


app.get(['*', '/', '/signup', '/login', '/search'], function (req, res) {
  res.render('index');
});

app.listen(3000, function(){
  console.log("Let's Marvin Gaye and get it on at port", 3000);
});
