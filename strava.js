const strava = require('strava-v3');
const axios = require('axios');

const express = require("express");
const app = express();

const client_id = process.env.CLIENT_ID || 29825;
const client_secret = '71c6f2dd03619e0d97320c5aad83a3e07d0f3c41';

strava.athlete.listActivities({"access_token":"773360a6d49961d35e6f8df4ac78293d397f5666"},function(err,payload,limits) {
    if(!err) {
        console.log(payload);
    }
    else {
        console.log(err);
    }
});




app.get("/create_token", async function(req, res) {
    let redirect_url = `http://localhost:3001/callback`
    let url = `https://www.strava.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code&scope=view_private`;    
    res.redirect(url)
});

app.get('/callback', async function (req, res) {
    let code = req.query.code;
    let url = `https://www.strava.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code`;
    let results = await axios.post(url);
    res.send(results.data);
});


app.listen(3001, function() {
    console.log("started...");
})
