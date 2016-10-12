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

router.get('/moons/:date', function(req, res) {
  var options = {
    uri: api.API_LEADERBOARD_MOONS + '/' + req.params.date + '?apiKey=' + apiKey,
    json: true,
  };

  request(options)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
});

router.get('/tower-builder/:startDate?/:endDate?', function(req, res) {
  var options = {
    uri: api.API_LEADERBOARD_TOWER_BUILDER + '?apiKey=' + apiKey + '&start=2000-01-01&end=2020-01-01',
    json: true,
  };

  if (req.params.startDate && req.params.endDate) {
    options.uri = api.API_LEADERBOARD_TOWER_BUILDER + '?apiKey=' + apiKey + '&start=' + req.params.startDate + '&end=' + req.params.endDate;
  }

  request(options)
    .then(function(data) {
      res.json(data);
    })
    .catch(function(err) {
      res.json(err);
    });
})

// Get leaderboard
router.get('/:startDate?/:endDate?', function(req, res) {
  var options = {
    uri: api.API_LEADERBOARD + '?apiKey=' + apiKey + '&start=2000-01-01&end=2020-01-01',
    json: true,
  };

  if (req.params.startDate && req.params.endDate) {
    var options = {
      uri: api.API_LEADERBOARD + '?apiKey=' + apiKey + '&start=' + req.params.startDate + '&end=' + req.params.endDate,
      json: true,
    };
  }

  request(options)
    .then(function(data) {
      res.json(data);
    }, function(err) {
      res.json(err);
    });
});

module.exports = router;
