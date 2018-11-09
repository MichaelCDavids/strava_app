const express = require('express');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const flash = require('express-flash');
const pg = require("pg");
const FactoryFunction = require('./services/factory');
const Routes = require('./routes/routes');

const session = require('express-session');



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
const appRoutes = Routes(Instance);

const app = express();

app.use(session({
    secret: 'just do it',
    resave: false,
    saveUninitialized: true
}));

// Middlewares
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
app.use(errorHandler);

// Create a mobile application or web site that will:
// Only deal with cycling and running activities


// Routes
app.get('/', appRoutes.indexGet); 
app.post("/", appRoutes.indexPost);  // Connect to the users Strava profile via the Strava API and retrieve the activity history for last 3 months or since inception if less
app.get('/profile', appRoutes.profile); 


app.get('/list_activities', appRoutes.listActivities);



// app.get('/get',apiRoutes.get)

const PORT = process.env.PORT || 3011;
app.listen(PORT, function () {
    console.log('App started and listening on port:', PORT);
});

// module.exports = app;