var express = require('express');
var router = express.Router();
var request = require('request-promise');
var moment = require('moment');
var _ = require('underscore');
var api = require('./_const');
var db = require('./../db');

const API_MIN_DATE = '2010-01-01';
const API_MAX_DATE = '2099-01-01';

router.get('/refresh', function(req, res) {

  var playerId = req.cookies.userPlayerId;

  if (!playerId)
    res.status(403).json({message: 'No player id found'});

  // The achievements
  const CLAIM_100_TOWERS = {
    id: 'CLAIM_100_TOWERS',
    title: 'Claim 100 towers',
    value: 100,
    achieved: false,
  };
  const CLAIM_50_TOWERS = {
    id: 'CLAIM_50_TOWERS',
    title: 'Claim 50 towers',
    value: 50,
    achieved: false
  };
  const ON_HALL_OF_FAME = {
    id: 'ON_HALL_OF_FAME',
    title: 'Be part of the Hall of Fame',
    value: null,
    achieved: false,
  };
  const FULL_MOON_10 = {
    id: 'FULL_MOON_10',
    title: 'Full Moon 10',
    value: 10,
    achieved: false,
  };
  const FULL_MOON_25 = {
    id: 'FULL_MOON_25',
    title: 'Full Moon 25',
    value: 25,
    achieved: false,
  };
  const BUILDER_10 = {
    id: 'BUILDER_10',
    title: 'Builder 10',
    value: 10,
    achieved: false,
  };
  const BUILDER_20 = {
    id: 'BUILDER_20',
    title: 'Builder 20',
    value: 20,
    achieved: false,
  };
  const BUILDER_30 = {
    id: 'BUILDER_30',
    title: 'Builder 30',
    value: 30,
    achieved: false,
  };
  const VISITOR_10 = {
    id: 'VISITOR_10',
    title: 'Visitor 10',
    value: 10,
    achieved: false,
  };
  const VISITOR_25 = {
    id: 'VISITOR_25',
    title: 'Visitor 25',
    value: 25,
    achieved: false,
  };
  const VISITOR_50 = {
    id: 'VISITOR_50',
    title: 'Visitor 50',
    value: 50,
    achieved: false,
  };

  // Check if user has earned achievement for claiming X amount of different towers
  var TYPE_VISITOR_X = new (function() {
    this.values = [VISITOR_10, VISITOR_25, VISITOR_50];
    this.check = function(data) {
      var filteredData = _.countBy(data, function(obj) {
        return obj.tower_id;
      });

      // Number of unique towers the player have claimed
      uniqueTowers = Object.keys(filteredData).length;

      // Map the achievements and check if conditions have been fulfilled
      this.values.map(function(obj) {
        if (obj.value <= uniqueTowers) {
          obj.achieved = true;
        }
        return obj;
      });

      return this.values;
    }
    this.promise = new Promise((resolve, reject) => {
      request({ uri: api.API_PERSONAL + '?apiKey=' + req.cookies.userApiKey + '&start=' + API_MIN_DATE + '&end=' + API_MAX_DATE, json: true })
        .then((response) => resolve(this.check(response)))
        .catch((error) => reject(error));
    });
  });

  // Check if user has earned achievement for building X amount of towers
  var TYPE_BUILD_X_TOWERS = new (function() {
    this.values = [BUILDER_10, BUILDER_20, BUILDER_30];
    this.check = function(data) {
      playerStats = data.find(function(obj) {
        return obj.player_id == playerId;
      });

      if (!playerStats)
        return this.values;

      this.values.map(function(obj) {
        if (playerStats.count >= obj.value)
          obj.achieved = true;
        return obj.value;
      });

      return this.values;
    },
    this.promise = new Promise((resolve, reject) => {
      request({ uri: api.API_LEADERBOARD_TOWER_BUILDER + '?apiKey=' + req.cookies.userApiKey + '&start=' + API_MIN_DATE + '&end=' + API_MAX_DATE, json: true })
        .then((response) => resolve(this.check(response)))
        .catch((error) => reject(error));
    });
  });

  // Check if user has earned achievement for claiming X amount of towers
  var TYPE_CLAIM_X_TOWERS = new (function() {
    this.values = [CLAIM_100_TOWERS, CLAIM_50_TOWERS];
    this.check = function(data) {
      playerStats = data.find(function(obj) {
        return obj.player_id == playerId;
      });

      if (!playerStats)
        return this.values;

      this.values.map(function(obj) {
        if (playerStats.claim_count >= obj.value)
          obj.achieved = true;
        return obj.value;
      });

      return this.values;
    }
    this.promise = new Promise((resolve, reject) => {
      request({ uri: api.API_LEADERBOARD + '?apiKey=' + req.cookies.userApiKey + '&start=' + API_MIN_DATE + '&end=' + API_MAX_DATE, json: true })
        .then((response) => resolve(this.check(response)))
        .catch((error) => reject(error));
    });
  });

  // Check if user has a spot on the hall of fame
  var TYPE_HALL_OF_FAME = new (function() {
    this.values = ON_HALL_OF_FAME;
    this.check = function(data) {
      data = data.find(function(obj) {
        return obj.player_id == playerId;
      });

      if (!data)
        return this.values;

      this.values.achieved = true;

      return this.values;
    }
    this.promise = new Promise((resolve, reject) => {
      request({ uri: api.API_HALL_OF_FAME_FIRST_TOWER + '?apiKey=' + req.cookies.userApiKey, json: true })
        .then((response) => resolve(this.check(response)))
        .catch((error) => reject(error));
    });
  });

  // Check if user has made a claim within x minutes of a new moon
  var TYPE_FULL_MOON = new (function() {
    var self = this;
    this.values = [FULL_MOON_10, FULL_MOON_25];
    this.check = function(newMoons, data) {

      // Filter out the new moons that are in the future as they are not relevant
      var moons = newMoons.filter(function(moon) {
        return moment().diff(moon.iso8601, 'days') > 0;
      });

      // Go through all the filtered new moons
      moons.forEach(function(moon) {
        // Loop through the different achievement values
        self.values.map(function(value) {
          // Check if a claim has been made between the achievements value and the new moon
          var found = data.find(function(obj) {
            return moment(obj.claimed_on).isBetween(moment(moon.iso8601).subtract(value.value, 'minute'), moment(moon.iso8601).add(value.value, 'minute'));
          });

          if (found) {
            value.achieved = true;
          }

          return value;
        })

      });

      return this.values;
    }
    this.promise = new Promise((resolve, reject) => {
      var pClaims = request({ uri: api.API_PERSONAL + '?apiKey=' + req.cookies.userApiKey + '&start=' + API_MIN_DATE + '&end=' + API_MAX_DATE, json: true });
      var pMoons = request({ uri: api.API_NEW_MOONS + '?apiKey=' + req.cookies.userApiKey, json: true });

      Promise.all([pClaims, pMoons])
        .then((values) => resolve(this.check(values[1], values[0])))
        .catch((error) => reject(error));
    });
  });

  function runQuery(achievements) {

    var data = achievements.filter(function(achievement) {
      return achievement.achieved === true;
    });

    data.forEach(function(achievement) {
      db.query(
        'INSERT INTO Achievement_Player (playerId, achievementId) VALUES (:playerId, :achievementId) ON DUPLICATE KEY UPDATE achievementId=achievementId',
        {playerId: playerId, achievementId: achievement.id},
        function(err, result) {
          if (err)
            console.log(err);

          // console.log(result);
        }
      );
    });

  }

  var achievements = [];

  function fetchAchievements() {
    return new Promise((resolve, reject) => {
      Promise.all([
          TYPE_CLAIM_X_TOWERS.promise,
          TYPE_BUILD_X_TOWERS.promise,
          TYPE_HALL_OF_FAME.promise,
          TYPE_FULL_MOON.promise,
          TYPE_VISITOR_X.promise
        ])
        .then((values) => resolve(_.flatten(values)))
        .catch((error) => reject(error));
    });
  }

  fetchAchievements()
    .then((response) => {
      runQuery(response);
      res.json(response);
    })
    .catch((error) => console.log(error));

});

// Get a list of achievements earned by the player
router.get('/', function(req, res) {
  db.query(
    'SELECT Achievement.*, (SELECT createdAt FROM Achievement_Player WHERE achievementId = Achievement.id && playerId = :playerId) AS createdAt FROM Achievement ORDER BY createdAt DESC',
    {playerId: req.cookies.userPlayerId},
    function(err, result) {
      if(err)
        console.log(err);

      res.json(result);
    }
  );
});

module.exports = router;
