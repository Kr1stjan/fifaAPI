const request = require('request');
const schedule = require('node-schedule');

// Run every day at 17:31  '31     17    *    *    *',
schedule.scheduleJob('31     17    *    *    *', function(){
    request.get({ url: "http://localhost:8000/scrape/" },      function(error, response, body) { 
              if (!error && response.statusCode == 200) { 
                  console.log("Request succesful");
                 } }); 
    console.log('Running schedule job...');
});