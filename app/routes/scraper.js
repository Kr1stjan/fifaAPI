const Team = require('../models/team');
var logger = require('../../log');
const scrapeIt = require("scrape-it");
module.exports = function(app, db) {

    /*
       Scraping from fifaindex.com/teams
    */
    app.get('/scrape', (req, res) => {
        // This is the number different pages of teams on fifaindex.com
        var clubPages = 22;
        var menNatPages = 2;
        
        for(i=1;i<=clubPages;i++){
            scrapeFifaIndex("https://www.fifaindex.com/teams/"+ i +"/?league=350&league=1&league=56&league=13&league=19&league=20&league=335&league=66&league=10&league=14&league=60&league=61&league=382&league=351&league=349&league=83&league=341&league=54&league=53&league=336&league=308&league=7&league=16&league=17&league=39&league=111&league=353&league=4&league=189&league=76&league=67&league=65&league=50&league=31&league=32&league=68&league=41&league=80&order_by=overallrating");}

        // Scrape men's national teams
        for(i=1;i<=menNatPages;i++){
            scrapeFifaIndex("https://www.fifaindex.com/teams/" + i + "/?type=1");}

        // Scrape women's national teams. Only one page so far
        scrapeFifaIndex("https://www.fifaindex.com/teams/" + i + "/?type=2");
        
        res.end();
    });
};

function scrapeFifaIndex(url){
            // Callback interface
            scrapeIt(url, {
                teams: {
                    listItem: "tbody tr" // html element where teams are located
                , data: {
                        name: "td[data-title=Name]",
                        league : "td[data-title=League]",
                        overallRating: "td[data-title=OVR]"
                    }
                }
            }, (err, page) => {
                if (err) {
                    logger.error('There was an error scraping the data!', err);
                return;
                }
                for(i=0;i<page.teams.length;i++){
                    var team;
                    name = page.teams[i].name;
                    league = page.teams[i].league;
                    rating = page.teams[i].overallRating;
                    team = {
                        name: name,
                        league: league,
                        overallRating: rating,
                    };
                    var query = {'name':name};
                    Team.findOneAndUpdate(query, team, {upsert:true}, function(err, doc){
                        if (err){
                            logger.error(err);
                        return handleError(err);
                    }
                    if(doc){
                        logger.info("Updated team NAME: " + doc.name + " LEAGUE: " + doc.league + " RATING: " + doc.overallRating);
                    }else{
                        logger.info("Saved new team");
                    }     
                    });
                }
            });
}

  