'use strict';

const express = require('express');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('express-flash');

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

app.get('/', apiRoutes.index);

app.use(errorHandler);
var PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
    console.log('Strava App started and running listening on port:', PORT);
});
module.exports = app;