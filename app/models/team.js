const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
  name:  String,
  league: String,
  overallRating: Number
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;