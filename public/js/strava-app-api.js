const axios = require('axios');
function StravaApp() {

  function getActivityById(){
    return axios.get('https://www.strava.com/api/v3/activities/35612273?include_all_efforts=true&access_token=3c40c8bad7f991734db910d02d1c58bfb411bf1a');
  };

  function strava_data() {
    return axios.get("https://www.strava.com/api/v3/athletes/35612273/stats?page=1&per_page=30&access_token=3c40c8bad7f991734db910d02d1c58bfb411bf1a")
  };

  return {
    strava_data,
    getActivityById

  };
}