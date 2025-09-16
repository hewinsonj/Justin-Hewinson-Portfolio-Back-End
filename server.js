// require necessary NPM packages
const express = require("express");
const mongoose = require("mongoose");
mongoose.set('strictQuery', true);
const cors = require("cors");

// require route files
const userRoutes = require("./app/routes/user_routes");
// const activityRoutes = require('./app/routes/activity_routes')
const projectRoutes = require("./app/routes/project_routes");
const noteRoutes = require("./app/routes/note_routes");
// const messageRoutes = require('./app/routes/message_routes')

// require middleware
const errorHandler = require("./lib/error_handler");
const replaceToken = require("./lib/replace_token");
const requestLogger = require("./lib/request_logger");

// require database configuration logic
// `db` will be the actual Mongo URI as a string
const db = require("./config/db");
// console.log(currentDb)

// require configured passport authentication middleware
const auth = require("./lib/auth");

// define server and client ports
// used for cors and local port declaration
const serverDevPort = 8000;
const clientDevPort = 3000;

// establish database connection
// use new version of URL parser
// use createIndex instead of deprecated ensureIndex
mongoose.connect(db, {
  useNewUrlParser: true,
  serverSelectionTimeoutMS: 5000, // fail fast if Atlas is slow to respond
  socketTimeoutMS: 45000,
  maxPoolSize: 10,
  minPoolSize: 1, // keep a warm connection
});

// instantiate express application object
const app = express();
app.set('trust proxy', true);

// lightweight health check that does not require auth or DB
app.get('/health', (_req, res) => res.status(200).send('ok'));

// set CORS headers on response from this API using the `cors` NPM package
// `CLIENT_ORIGIN` is an environment variable that will be set on Heroku
const corsOptions = {
  origin: process.env.CLIENT_ORIGIN || `http://localhost:${clientDevPort}`,
  credentials: true,
  methods: ['GET','POST','PUT','PATCH','DELETE','OPTIONS'],
  allowedHeaders: ['Content-Type','Authorization'],
  optionsSuccessStatus: 204,
};
app.use(cors(corsOptions));
// Explicitly handle preflight for all routes
app.options('*', cors(corsOptions));

// define port for API to run on
// adding PORT= to your env file will be necessary for deployment
const port = process.env.PORT || 8000;

// this middleware makes it so the client can use the Rails convention
// of `Authorization: Token token=<token>` OR the Express convention of
// `Authorization: Bearer <token>`
app.use(replaceToken);

// register passport authentication middleware
app.use(auth);

// add `express.json` middleware which will parse JSON requests into
// JS objects before they reach the route files.
// The method `.use` sets up middleware for the Express application
app.use(express.json());
// this parses requests sent by `$.ajax`, which use a different content type
app.use(express.urlencoded({ extended: true }));

// log each request as it comes in for debugging
app.use(requestLogger);

// register route files
app.use(userRoutes);

app.use(projectRoutes);
// app.use(activityRoutes)
app.use(noteRoutes);

// app.use(messageRoutes)
// register error handling middleware
// note that this comes after the route middlewares, because it needs to be
// passed any error messages from them
app.use(errorHandler);

// run API on designated port (4741 in this case)// Start the server only after Mongo is connected
function startServer() {
  app.listen(port, '0.0.0.0', () => {
    console.log('listening on port ' + port);
  });
}

mongoose.connection.on('error', (err) => {
  console.error('Mongo connection error:', err);
  // Fail fast on boot if we can’t reach the DB
  process.exit(1);
});

// If we’re already connected (e.g., very fast connect), start immediately
if (mongoose.connection.readyState === 1) {
  startServer();
} else {
  // Otherwise, wait for the first successful connection
  mongoose.connection.once('open', startServer);
}

// needed for testing
module.exports = app;
