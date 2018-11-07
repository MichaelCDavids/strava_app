const axios = require('axios');
const client = require('../client/client');
const strava = require('strava-v3');

module.exports = function (Instance) {
    async function indexGet(req, res) {
        // Instance.print('Michael');
        res.render('index');
    };
    async function indexPost(req, res) {
        let redirect_url = `http://localhost:3011/profile`
        let url = `https://www.strava.com/oauth/authorize?client_id=${client.client_id}&redirect_uri=${redirect_url}&response_type=code&scope=view_private`;
        res.redirect(url);
    };
    async function profile(req, res) {
        let code = req.query.code;
        let url = `https://www.strava.com/oauth/token?client_id=${client.client_id}&client_secret=${client.client_secret}&code=${code}&grant_type=authorization_code`;
        let results = await axios.post(url);
        res.render('athlete', {
            data: await results.data,
        })
    };



    async function listActivities(req, res) {
        strava.athlete.listActivities({"access_token": "773360a6d49961d35e6f8df4ac78293d397f5666"}, 
        async function (err, payload, limits){
            if (!err) {
                let runningActivities = await Instance.sortByActivity(payload, 'Run');
                console.log(runningActivities);
                let cyclingActivities = await Instance.sortByActivity(payload, 'Ride');
                console.log(cyclingActivities);
                let data = {
                    runs: runningActivities,
                    rides: cyclingActivities
                }
                console.log(data);
                res.render('summaries')
            } else {
                console.log(err);
            }
        })
    };


    return {
        indexGet,
        indexPost,
        profile,
        listActivities,
    };
}