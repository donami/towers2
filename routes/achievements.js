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
  const MOON_CAMPER_10 = {
    id: 'MOON_CAMPER_10',
    title: 'Moon Camper 10',
    value: 10,
    achieved: false,
  };
  const MOON_CAMPER_25 = {
    id: 'MOON_CAMPER_25',
    title: 'Moon Camper 25',
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
  const STREAK_2 = {
    id: 'STREAK_2',
    title: 'Streak 2',
    value: 2,
    achieved: false,
  };
  const STREAK_5 = {
    id: 'STREAK_5',
    title: 'Streak 5',
    value: 5,
    achieved: false,
  };
  const STREAK_10 = {
    id: 'STREAK_10',
    title: 'Streak 10',
    value: 10,
    achieved: false,
  };
  const STREAK_20 = {
    id: 'STREAK_20',
    title: 'Streak 20',
    value: 20,
    achieved: false,
  };
  const CHALLENGER_10 = {
    id: 'CHALLENGER_10',
    title: 'Challenger 10',
    value: 10,
    achieved: false,
  };
  const CHALLENGER_20 = {
    id: 'CHALLENGER_20',
    title: 'Challenger 20',
    value: 20,
    achieved: false,
  };
  const CHALLENGER_30 = {
    id: 'CHALLENGER_30',
    title: 'Challenger 30',
    value: 30,
    achieved: false,
  };
  const FULL_MOON_1 = {
    id: 'FULL_MOON_1',
    title: 'Full Moon 1',
    value: 1,
    achieved: false,
  };
  const FULL_MOON_5 = {
    id: 'FULL_MOON_5',
    title: 'Full Moon 5',
    value: 5,
    achieved: false,
  };
  const FULL_MOON_10 = {
    id: 'FULL_MOON_10',
    title: 'Full Moon 10',
    value: 10,
    achieved: false,
  };

  // Check if user has earned achievement for claiming X amount of towers within one minute of a new moon
  const TYPE_FULL_MOON_X = new (function() {
    this.values = [FULL_MOON_1, FULL_MOON_5, FULL_MOON_10];
    this.check = function(newMoons, data) {

      // Filter out the moons in the future as they are not relevant
      var moons = newMoons.filter(function(moon) {
        return moment().diff(moon.iso8601, 'days') > 0;
      });

      var count = 0;
      // Go through all the filtered new moons
      moons.forEach(function(moon) {

        var found = data.find(function(obj) {
          return moment(obj.claimed_on).isBetween(moment(moon.iso8601).subtract(1, 'minute'), moment(moon.iso8601).add(1, 'minute'));
        });

        if (found) count++;
      });

      this.values.map((obj) => {
        if (obj.value <= count) {
          obj.achieved = true;
        }

        return obj;
      });

      return this.values;
    };
    this.promise = new Promise((resolve, reject) => {
      var pClaims = request({ uri: api.API_PERSONAL + '?apiKey=' + req.cookies.userApiKey + '&start=' + API_MIN_DATE + '&end=' + API_MAX_DATE, json: true });
      var pMoons = request({ uri: api.API_NEW_MOONS + '?apiKey=' + req.cookies.userApiKey, json: true });

      Promise.all([pClaims, pMoons])
        .then((values) => resolve(this.check(values[1], values[0])))
        .catch((error) => reject(error));
    });
  });

  // Check if user has earned achievement for claiming X amount of towers from other players
  const TYPE_CHALLENGER_X = new (function() {
    this.values = [CHALLENGER_10, CHALLENGER_20, CHALLENGER_30];
    this.check = function(data) {

      data = data.filter((obj) => obj.previous_player_id !== playerId && obj.previous_player_id !== '');
      var claimCount = data.length;

      this.values.map((obj) => {
        if (obj.value <= claimCount) {
          obj.achieved = true;
        }
        return obj;
      });

      return this.values;
    };
    this.promise = new Promise((resolve, reject) => {
      request({ uri: api.API_PERSONAL + '?apiKey=' + req.cookies.userApiKey + '&start=' + API_MIN_DATE + '&end=' + API_MAX_DATE, json: true })
        .then((response) => resolve(this.check(response)))
        .catch((error) => reject(error));
    });
  });

  // Check if user has earned achievement for claiming a tower for X days in a row
  const TYPE_STREAK_X = new (function() {
    this.values = [STREAK_2, STREAK_5, STREAK_10, STREAK_20];
    this.check = function(data) {

      data = _.sortBy(data, (obj) => {
        return obj.claimed_on;
      });

      var streak = 1;
      var highestStreak = 0;
      var prevDate;

      var claimedDates = data.map((claim) => claim.claimed_on.substring(0, 10));

      // Ignore claims made the same day
      claimedDates = _.uniq(claimedDates);

      claimedDates.forEach((claim) => {
        // If current claim date is same as before increase streak count
        if (moment(claim).subtract(1, 'days').format('YYYY-MM-DD') === prevDate) {
          streak++;
        }
        else {
          // if streak is higher than previous highest
          // set the variable to current streak
          if (streak > highestStreak) {
            highestStreak = streak;
          }
          // Since the claimed on date is not same
          // as day before reset it
          streak = 1;
        }
        // Use current date as previous date for next iteration
        prevDate = claim;
      });

      this.values.map((obj) => {
        if (obj.value <= highestStreak) {
          obj.achieved = true;
        }
        return obj;
      });

      return this.values;
    };
    this.promise = new Promise((resolve, reject) => {
      request({ uri: api.API_PERSONAL + '?apiKey=' + req.cookies.userApiKey + '&start=' + API_MIN_DATE + '&end=' + API_MAX_DATE, json: true })
        .then((response) => resolve(this.check(response)))
        .catch((error) => reject(error));
    });
  });

  // Check if user has earned achievement for claiming X amount of different towers
  const TYPE_VISITOR_X = new (function() {
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
  const TYPE_BUILD_X_TOWERS = new (function() {
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
  const TYPE_CLAIM_X_TOWERS = new (function() {
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
  const TYPE_HALL_OF_FAME = new (function() {
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
  const TYPE_MOON_CAMPER = new (function() {
    var self = this;
    this.values = [MOON_CAMPER_10, MOON_CAMPER_25];
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
          TYPE_MOON_CAMPER.promise,
          TYPE_VISITOR_X.promise,
          TYPE_STREAK_X.promise,
          TYPE_CHALLENGER_X.promise,
          TYPE_FULL_MOON_X.promise
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
