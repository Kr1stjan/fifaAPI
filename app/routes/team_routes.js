var logger = require('../../log');
const Team = require('../models/team');

module.exports = function(app, db) {


  app.get('/teams/:name?/:league?/:min_rating?/:max_rating?', (req, res) => {
        var name = req.query.name;
        var league = req.query.league;
        var minRating = 1;
        var maxRating = 99;
        var query = {};

        if(name) {
            query.name = new RegExp(name, "i");} 
        if(league) {
            query.league = new RegExp(league, "i");}
        if(req.query.min_rating){
            minRating = req.query.min_rating;}
        if(req.query.max_rating){
            maxRating = req.query.max_rating;}
        query.overallRating = { $gt :  minRating, $lt : maxRating};

        //logger.info("Search query: " + JSON.stringify(query)); Doesn't work because of regex
        Team.find(query, function(err, filterdTeams) {
            res.json({filterdTeams});
        });
  });

  app.post('/teams', (req, res) => {
    var team = new Team(); 
    team.name = req.body.name;
    team.overallRating = req.body.rating;
    team.league = req.body.league;
    team.save(function(err) {
        if (err){
            logger.error('There was an error saving the new team via POST!', err);
            res.send(err);
        } 
        logger.info("Team saved: " + team.name)
        res.json({ message: 'Team created!' });
        });
  });
};