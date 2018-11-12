module.exports = function () {
  function getAthlete() {
    return axios.get("https://www.strava.com/api/v3/athlete?access_token=773360a6d49961d35e6f8df4ac78293d397f5666")
  };

  function listActivities() {
    return axios.get(`https://www.strava.com/api/v3/athlete/activities?access_token=773360a6d49961d35e6f8df4ac78293d397f5666`)
  };

  function getStats() {
    return axios.get("https://www.strava.com/api/v3/athletes/35612273/stats?page=1&per_page=30&access_token=773360a6d49961d35e6f8df4ac78293d397f5666")
  };

  function getActivityById() {
    return axios.get('https://www.strava.com/api/v3/activities/35612273?include_all_efforts=true&access_token=773360a6d49961d35e6f8df4ac78293d397f5666');
  };

  function getAuthCode(client_id, req, res) {
    
  };

  async function getToken(client_id, client_secret, req, res) {
    
  }
  return {
    getAthlete,
    listActivities,
    getStats,
    getActivityById,
    getAuthCode,
    getToken
  };
}
