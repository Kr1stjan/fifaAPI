
var chai       = require('chai');
var chaiHttp   = require('chai-http');
const mongoose = require('mongoose');
const config   = require('../config/env.json')[process.env.NODE_ENV || 'development'];
const Team     = require('../app/models/team');
var should     = chai.should();

chai.use(chaiHttp);

var app = require('../server');

describe('Teams', function() {
  before(function (done) {
    mongoose.createConnection(config.MONGO_URI, done);
  });
  it('should have 680 teams in the database', function(done) {
      Team.count({}, function(err, count){
        count.should.equal(680);
      });
      done();
});
  it('should list 680 teams on /teams GET', function(done) {
  chai.request(app)
    .get('/teams')
    .end(function(err, res){
      var teamCount = 680;
      should.equal(err, null); 
      res.should.have.status(200); 
      res.should.be.json;
      var data = JSON.parse(res.text);
      teamCount.should.equal(data.filteredTeams.length);
      done();
    });
});
  it('should list 15 teams containing "City" on /teams?name=city GET', function(done) {
  chai.request(app)
    .get('/teams?name=city')
    .end(function(err, res){
      var teamCount = 15;
      should.equal(err, null); 
      res.should.have.status(200); 
      res.should.be.json;
      var data = JSON.parse(res.text);
      teamCount.should.equal(data.filteredTeams.length);
      done();
    });
});

  it('should list 6 teams with rating over 84 /teams?min_rating=84', function(done) {
  chai.request(app)
    .get('/teams?min_rating=84')
    .end(function(err, res){
      var teamCount = 6;
      should.equal(err, null); 
      res.should.have.status(200); 
      res.should.be.json;
      var data = JSON.parse(res.text);
      teamCount.should.equal(data.filteredTeams.length);
      done();
    });
});
});