const express        = require('express');
const bodyParser     = require('body-parser');
const db             = require('./config/db');
const scheduler      = require('./config/scheduler');
const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

const app            = express();

const port = 8000;

app.use(bodyParser.urlencoded({ extended: true }));

/* 
 * Mongoose by default sets the auto_reconnect option to true.
 * We recommend setting socket options at both the server and replica set level.
 * We recommend a 30 second connection timeout because it allows for 
 * plenty of time in most operating environments.
 */
var options = { server: { socketOptions: { keepAlive: 300000, connectTimeoutMS: 30000 } }, 
                replset: { socketOptions: { keepAlive: 300000, connectTimeoutMS : 30000 } } };

mongoose.connect(db.url, options);
var conn = mongoose.connection;             
 
conn.on('error', console.error.bind(console, 'connection error:'));  
 
conn.once('open', function() {
    require('./app/routes')(app, conn);
    app.listen(port, () => {
        console.log('Listening on port ' + port);
    });                    
});