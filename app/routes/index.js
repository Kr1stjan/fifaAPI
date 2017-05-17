const teamRoutes = require('./team_routes');
module.exports = function(app, db) {
  teamRoutes(app, db);
  // Other route groups could go here, in the future
};