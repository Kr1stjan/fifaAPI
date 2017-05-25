const express        = require('express');
const bodyParser     = require('body-parser');
const config         = require('./config/env.json')[process.env.NODE_ENV || 'development'];
const scheduler      = require('./config/scheduler');
const mongoose       = require('mongoose');
mongoose.Promise     = require('bluebird');

const app            = express();

const port = config.PORT;

app.use(bodyParser.urlencoded({ extended: true }));

var options = config.PORT.MONGO_OPTIONS;

mongoose.connect(config.MONGO_URI, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
    require('./app/routes')(app, conn);
    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });                  
});

module.exports = app;