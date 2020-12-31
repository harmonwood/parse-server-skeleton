var express = require('express');
var ParseServer = require('parse-server').ParseServer;
const path = require('path');

var databaseUri = process.env.DATABASE_URI || process.env.MONGODB_URI;

var api = new ParseServer({
  databaseURI: databaseUri || 'mongodb://localhost:27017/dev', // Connection string for your MongoDB database
  cloud: process.env.CLOUD_CODE_MAIN || __dirname + '/cloud/main.js', // Path to your Cloud Code
  appId: process.env.APP_ID || 'myAppId',
  masterKey: process.env.MASTER_KEY || 'myMasterKey', // Keep this key secret!
  fileKey: process.env.FILE_KEY || 'optionalFileKey',
  serverURL: process.env.SERVER_URL || 'http://localhost:1337/parse', // Don't forget to change to https if needed
  //liveQuery: {
  //  classNames: ["Posts", "Comments"] // List of classes to support for query subscriptions
  //}
});

var app = express();

// Serve the Parse API on the /parse URL prefix
app.use('/parse', api);

// Serve static assets from the /public folder
app.use('/', express.static(path.join(__dirname, '/public')));

var port = process.env.PORT || 1337;

var httpServer = require('http').createServer(app);

httpServer.listen(port, function() {
    console.log('parse-server-skeleton running on port ' + port + '.');
});

// This will enable the Live Query real-time server
// ParseServer.createLiveQueryServer(httpServer);