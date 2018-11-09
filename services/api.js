const axios = require('axios');
const strava = require('strava-v3');
const moment = require('moment');

module.exports = function StravaAPI() {

  function listActivities2() {
    return axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=773360a6d49961d35e6f8df4ac78293d397f5666`)
    // strava.athlete.listActivities({ "access_token": "773360a6d49961d35e6f8df4ac78293d397f5666" }, async function (err, payload, limits) {
    //   return payload;
    // });
  }


  function listActivities() {
    strava.athlete.listActivities({ "access_token": "773360a6d49961d35e6f8df4ac78293d397f5666" }, async function (err, payload, limits) {
      return payload;
    });
  }

  function getActivityById() {
    return axios.get('https://www.strava.com/api/v3/activities/35612273?include_all_efforts=true&access_token=3c40c8bad7f991734db910d02d1c58bfb411bf1a');
  };

  function strava_data() {
    return axios.get("https://www.strava.com/api/v3/athletes/35612273/stats?page=1&per_page=30&access_token=3c40c8bad7f991734db910d02d1c58bfb411bf1a")
  };

  return {
    listActivities,
    listActivities2,
    strava_data,
    getActivityById
  };
}