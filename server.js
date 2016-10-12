var express  = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');

var apiRoutes = require('./routes/api');

var app = express();


app.use(express.static(__dirname + '/dist'));
app.use("/assets", express.static(__dirname + '/client/assets'));
app.use('/app/', express.static(__dirname + '/client/app/'));
// app.use("/templates", express.static(__dirname + '/public/partials'));
// app.use("/js", express.static(__dirname + '/public/js'));
// app.use("/style", express.static(__dirname + '/public/css'));
// app.use("/bower_components", express.static(__dirname + '/bower_components'));

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'}));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
  next();
});

app.use(function(req, res, next) {
  next();
});

app.use('/api', apiRoutes);

app.get('*', function(req, res) {
  res.sendFile('dist/index.html', { root: __dirname });
});

app.listen(process.env.PORT || 3000);
console.log("Server running on port 3000");
