'use strict';
const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');
const strava = require('strava-v3');
const axios = require('axios');
const FactoryFunction = require('./services/strava-app-factory');
const APIroutes = require('./routes/strava-app-routes');
const app = express();
const pg = require("pg");
const Pool = pg.Pool;
let useSSL = false;
let local = process.env.LOCAL || false;
if (process.env.DATABASE_URL && !local) {
    useSSL = true;
}
const connectionString = process.env.DATABASE_URL || 'postgresql://coder:pg123@localhost:5432/strava_app_database';
const pool = new Pool({
    connectionString,
    ssl: useSSL
});
const Instance = FactoryFunction(pool);
const apiRoutes = APIroutes(Instance);
app.use(session({
    secret: 'just do it',
    resave: false,
    saveUninitialized: true
}));
app.use(flash());
app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));
app.set('view engine', 'handlebars');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({
    extended: false
}))
app.use(bodyParser.json())

function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {
        error: err
    });
}


const client_id = process.env.CLIENT_ID || 29825;
const client_secret = '71c6f2dd03619e0d97320c5aad83a3e07d0f3c41';

app.get('/', function (req, res) {
    res.render('home');
});

app.get("/create_token", async function (req, res) {
    let redirect_url = `http://localhost:3011/callback`
    let url = `https://www.strava.com/oauth/authorize?client_id=${client_id}&redirect_uri=${redirect_url}&response_type=code&scope=view_private`;
    // console.log(url);
    res.redirect(url);
});
app.get('/callback', async function (req, res) {
    let code = req.query.code;
    let url = `https://www.strava.com/oauth/token?client_id=${client_id}&client_secret=${client_secret}&code=${code}&grant_type=authorization_code`;
    // console.log(url);
    let results = await axios.post(url);
    // console.log(results.status);
    // res.send(results.data);
    res.render('athlete', {
        data: await results.data
    })
});
app.get('/stuff', function(req,res){
    strava.athlete.listActivities({
        "access_token": "773360a6d49961d35e6f8df4ac78293d397f5666"
    }, function (err, payload, limits) {
        if (!err) {
            console.log(payload);
            console.log('here');
    
        } else {
            console.log(err);
        }
    })
});

app.use(errorHandler);
var PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
    console.log('Strava App started and running listening on port:', PORT);
});
module.exports = app;