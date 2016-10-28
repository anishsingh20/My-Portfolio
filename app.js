var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('client-sessions');
//require routes
//contains all the routes
var routes =  require(path.join(__dirname +  '/routes'));



var app = express();

// view engine setup
//setting up the templating engine
//views contain all the templating files
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');



//user sessions//
// app.use(session({
//   cookieName: 'mySession', // cookie name dictates the key name added to the request object
//   secret: 'blargadeeblargblarg', // should be a large unguessable string
//   duration: 24 * 60 * 60 * 1000, // how long the session will stay valid in ms
//   activeDuration: 1000 * 60 * 5 // if expiresIn < activeDuration, the session will be extended by activeDuration milliseconds
// }));
//

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));

//using body-parser to parse the form's data into JS object
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//using cookie-parser  to parse user's data stored inside Cookies
app.use(cookieParser());

//requiring all the static files inside the public folder
app.use(express.static(path.join(__dirname, 'public')));

//use routes
app.use('/',routes);



// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


app.listen(4000,function(){
	console.log('Running app successfully on Port 4500');
});



module.exports = app;
