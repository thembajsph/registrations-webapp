const flash = require('express-flash');
const session = require('express-session');
const routes = require('./routes');
const registration = require('./registrations')
const express = require("express");
const app = express();

// always require your pg
const pg = require("pg");
const Pool = pg.Pool

const connectionString = process.env.DATABASE_URL || 'postgresql://thembajoseph:themba17307@localhost:5432/registrations-database';

const pool = new Pool({
  connectionString
});

var moment = require('moment'); // require
moment().format()


app.use(session({
  secret: "<add a secret string here>",
  resave: false,
  saveUninitialized: true
}));

// initialise the flash middleware
app.use(flash());

const registrations = registration(pool);
const routesFactory = routes(registrations)


// const greetings = greet(pool);
// const routesFact = routes(greetings)

const exphbs = require('express-handlebars');

// //get body parser / instantiate
const bodyParser = require('body-parser');


//after ive instantiate my app ,configure , expressJs as handlebars(middleware)
app.engine('handlebars', exphbs({ defaultLayout: "main" }));
app.set('view engine', 'handlebars');

//make the public folder visible when using express, could be css ,js ,page wanst styled.now can see the middleware
// http://localhost:3011/css/style.css --- to see your css

app.use(express.static('public'));

// // parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// // parse application/json
app.use(bodyParser.json());




app.get("/", routesFactory.root);

app.post("/registrations", routesFactory.postRegistrations);

app.get("/registrations", routesFactory.getRegistrations);

app.get("/filteredTowns", routesFactory.filteredTowns);

app.get("/clearDb", routesFactory.clearDatabase);

const PORT = process.env.PORT || 3050

app.listen(PORT, function () {
  console.log("app started at port:", PORT);

});




// && /^[A-Z0-9].{1,9}$/.test(regTown)
// console.log(regex)
 //instance.storeData(town);
  // }
    //  else {
    //   flashMsg
    // if (/C[ALJ] \d{3,5}$/.test() || /C[ALJ] \d+\s|-\d+$/.test())
