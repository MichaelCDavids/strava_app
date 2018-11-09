const axios = require('axios');
const client = require('../client/client');

module.exports = function (Instance) {
    async function indexGet(req, res) {
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
        let results = await Instance.listActivities()
        res.json({results});
        // strava.athlete.listActivities({
        //         "access_token": "773360a6d49961d35e6f8df4ac78293d397f5666"
        //     },
        //     async function (err, payload, limits) {
        //         let data = [];
        //         let runs = [];
        //         let rides = [];
        //         if (!err) {
        //             for (let i = 0; i < payload.length; i++) {
        //                 const activity = payload[i];
        //                 let date = new Date();
        //                 date.setMonth(date.getMonth() - 3)

        //                 if (moment(activity.start_date).utc() > moment(date).utc()) {
        //                     data.push(
        //                         activity
        //                     );
        //                     if(activity.type === 'Run'){
        //                         runs.push(
        //                             activity
        //                         );  
        //                     }else if(activity.type === 'Ride'){
        //                         runs.push(
        //                             activity
        //                         );
        //                     }   
        //                 }
        //             }

        //             let obj = {
        //                 data,
        //                 runs,
        //                 rides
        //             }

        //             console.log(obj)
        //             res.render('summaries', obj)
        //         } else {
        //             console.log(err);
        //         }
        //     });

        
    }


    return {
        indexGet,
        indexPost,
        profile,
        listActivities
    };
}