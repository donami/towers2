var express = require('express');
var router = express.Router();
var request = require('request-promise');
var api = require('./_const');

// TODO: this should be removed
var apiKey;
router.use(function(req, res, next) {
  apiKey = '9zEUDsWNqr0jCQ0MbIad8QgWH0giPxF4';

  if (req.cookies.userApiKey) {
    apiKey = req.cookies.userApiKey;
  }

  next();
});

router.get('/first-tower', function(req, res) {
  var options = {
    uri: api.API_HALL_OF_FAME_FIRST_TOWER + '?apiKey=' + apiKey,
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
});

router.get('/', function(req, res) {
  res.json([]);
});

module.exports = router;
