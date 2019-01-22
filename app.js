var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var mongoose = require('mongoose')
var favicon = require('serve-favicon')
var session = require('express-session')
var bodyParser = require('body-parser')
const helmet = require('helmet')
const passport = require('./passport')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(favicon('public/images/favicon.ico'))
app.use(helmet())
// use sessions for tracking logins
app.use(
  session({
    secret: 'work hard',
    resave: false,
    saveUninitialized: false
  })
)

app.use(passport.initialize())
app.use(passport.session()) // will call the deserializeUser
/* Express app ROUTING */
app.use('/auth', require('./routes/user.routes'))

if (process.env.NODE_ENV === 'production'){
  app.use(express.static(path.join(__dirname, 'frontend/build')));

  app.get('*',(req,res)=> {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html'));
  });
}

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

const uri =
  'mongodb+srv://dtb888:Tropic8*mdb@clusterdtb-whtpl.mongodb.net/login-app?retryWrites=true'
mongoose.Promise = global.Promise

mongoose.connect(
  uri,
  { useNewUrlParser: true }
)

mongoose.connection.on('error', function () {
  console.log('Connection to Mongo established.')
  console.log('Could not connect to the database. Exiting now...')
  process.exit()
})
mongoose.connection.once('open', function () {
  console.log('Successfully connected to the database')
})

module.exports = app;
