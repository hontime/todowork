var createError = require('http-errors');
var express = require('express');
var path = require('path');

var session = require('express-session');
var MySQLStore = require('express-mysql-session')(session);
var options = {
  host: '172.18.0.4',
  port: 3306,
  user:"root",
  password:'ss748201',
  database:'todowork'
};
var sessionStore = new MySQLStore(options);

var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var todoRouter = require('./routes/todo');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(session({
  key:'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie:{
    maxAge: 1000 * 30 * 30,
  },
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/javascript',express.static(path.join(__dirname,'public/javascripts')));

app.use('/', indexRouter);
app.use('/auth', usersRouter);
app.use('/todo',todoRouter);

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

module.exports = app;
