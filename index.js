var webpack 			 = require('webpack')
var webpackDevMiddleware = require('webpack-dev-middleware')
var webpackHotMiddleware = require('webpack-hot-middleware')
var bodyParser 			 = require('body-parser')
var { Server } 			 = require('http');
var express 			 = require('express')
var path 				 = require('path');
var cookieParser 		 = require('cookie-parser');
var passport 			 = require('passport');

const port   = process.env.PORT || 3000;
const app 	 = express();
const server = Server(app);

var webpackConfig  = require('./webpack.config.js');
var compiler 	   = webpack(webpackConfig);

// connect to the database and load models
var config 	 = require('./config');
require('./server/models').connect(config.dbUri);

app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }))
app.use(webpackHotMiddleware(compiler))
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static('./server/static/'));
// pass the passport middleware
app.use(passport.initialize());

// load passport strategies
const localSignupStrategy = require('./server/passport/local-signup');
const localLoginStrategy = require('./server/passport/local-login');
passport.use('local-signup', localSignupStrategy);
passport.use('local-login', localLoginStrategy);

// pass the authenticaion checker middleware
const authCheckMiddleware = require('./server/middleware/auth-check');
app.use('/api', authCheckMiddleware);

// routes
const authRoutes = require('./server/routes/auth');
const apiRoutes = require('./server/routes/api');
app.use('/auth', authRoutes);
app.use('/api', apiRoutes);

app.get("*", function(req, res, next) {
  res.sendFile(__dirname + '/server/static/index.html')
})

server.listen(port,function(error) {
  if (error) {
    console.error(error)
  } else {
    console.info("==> 🌎  Listening on port %s. Open up http://localhost:%s/ in your browser.", port, port )
  }
})
