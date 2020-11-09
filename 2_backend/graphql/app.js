var express = require('express'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    cors = require('cors'),
    errorhandler = require('errorhandler'),
    mongoose = require('mongoose');

var isProduction = process.env.NODE_ENV === 'production';

// Create global app object
var app = express();

app.use(cors());

// Normal express config defaults
app.use(require('morgan')('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(require('method-override')());
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'conduit', cookie: { maxAge: 60000 }, resave: false, saveUninitialized: false  }));

if (!isProduction) {
  app.use(errorhandler());
}

function mongooseConnect() {
  setTimeout(() => {
    if(isProduction){
      mongoose.connect(process.env.MONGODB_URI);
    } else {
      mongoose.set('useNewUrlParser', true);
      mongoose.set('useUnifiedTopology', true);
      try {
        mongoose.connect('mongodb://localhost/conduit_nodejs');
        // mongoose.connect('mongodb://mongo/conduit_nodejs');
      } catch (error) {
        console.log(error);
        
        process.exit(1);
        mongooseConnect();
      }
      mongoose.set('debug', true);
    }
  }, 10);
}

mongooseConnect()

require('./models/User');
require('./models/series/Serie');
require('./models/movies/Movie');

app.use(require('./routes'));

/// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // console.log(req);
  // console.log(res);
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (!isProduction) {
  app.use(function(err, req, res, next) {
    console.log(err.stack);

    res.status(err.status || 500);

    res.json({'errors': {
      message: err.message,
      error: err
    }});
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({'errors': {
    message: err.message,
    error: {}
  }});
});

// finally, let's start our server...
var server = app.listen( 3002, function(){
  console.log('Listening on port ' + 3002);
});