const client = require('../client/client');
const axios = require('axios');
const strava = require('strava-v3');
const factory = require('../services/factory');

const instance = factory()

module.exports = function () {
    function indexGet(req, res) {
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
        });
    };


    async function listActivities(req, res) {
        strava.athlete.listActivities({
                "access_token": "773360a6d49961d35e6f8df4ac78293d397f5666"
            },
            async function (err, payload, limits) {
               let obj = instance.listActivities(err, payload)
               let runSummary = await instance.runSummary(obj.runs)
               let rideSummary = await instance.rideSummary(obj.rides)
               obj = {
                   runSummary,
                   rideSummary
               }
               res.render('summaries', obj) 
            });


    }


    return {
        indexGet,
        indexPost,
        profile,
        listActivities
    };
}