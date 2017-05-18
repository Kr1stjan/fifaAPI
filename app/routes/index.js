const teamRoutes = require('./team_routes');
const scraper = require('./scraper');
module.exports = function(app, db) {
  teamRoutes(app, db);
  scraper(app, db);
  // Other route groups could go here, in the future
};