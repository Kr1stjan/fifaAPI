const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var teamSchema = new Schema({
  name: { type: String, index: {unique: true}},
  league: String,
  overallRating: Number
},{
  timestamps: true
});

const Team = mongoose.model('Team', teamSchema);

module.exports = Team;