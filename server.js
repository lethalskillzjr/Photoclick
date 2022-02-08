const express = require('express');
const bodyParser = require('body-parser');
//const cookieParser = require('cookie-parser')
const session = require('express-session');
const passport = require('passport');
const connectEnsureLogin = require('connect-ensure-login');
//const mongoose = require('mongoose');
const User = require('./userModel.js');
//const router = express.Router();     
const app = express();
//const MongoStore = require('connect-mongo')(session);

/*mongoose
mongoose.connect('mongodb+srv://Ginko:tokoyama@cluster0-vatbg.mongodb.net/registrationFormHeruko?retryWrites=true&w=majority', {
    useNewUrlParser: true, 
    useUnifiedTopology : true
}).then(() => console.log('connected,,'))
.catch((err)=> console.log(err));*/

/*var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
});*/

//session
const oneDay = 1000 * 60 * 60 * 24;

app.use(session({
    secret: "thisismysecretekeycrimsonshadowstyle767",
    saveUninitialized: false,
    cookie: {maxAge: oneDay},
    resave: false,
    /*store: new MongoStore({
            mongooseConnection: db
           })*/
}));


/*app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(cookieParser());*/

//Middlewares
//Bodyparser
//app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(passport.initialize());
app.use(passport.session());

//Passport local strategy
passport.use(User.createStrategy());

// To use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Serving static files
app.use((req, res, next) => {
    if(req.path.indexOf('.') === -1) {
	res.setHeader('Content-Type', 'text/html');
    }
    next();
});

app.use(express.static('view'));

//route
//app.use('/', require('./Routes/index'));
/*app.use(app.router);
routes.initialize(app);*/
app.use('/', require('./index.js'));

app.listen(3000);
