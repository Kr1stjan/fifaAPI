var ObjectID = require('mongodb').ObjectID;

module.exports = function(app, db) {


  app.get('/teams/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('teams').findOne(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send(item);
      }
    });
  });

  app.post('/teams', (req, res) => {
    const team = { team_name: req.body.team_name, team_rating: req.body.team_rating, 
    country: req.body.country, division: req.body.division };
    db.collection('teams').insert(team, (err, result) => {
      if (err) { 
        res.send({ 'error': 'An error has occurred' }); 
      } else {
        res.send(result.ops[0]);
      }
    });
  });

  app.delete('/teams/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    db.collection('teams').remove(details, (err, item) => {
      if (err) {
        res.send({'error':'An error has occurred'});
      } else {
        res.send('Team ' + id + ' deleted!');
      } 
    });
  });

  app.put('/teams/:id', (req, res) => {
    const id = req.params.id;
    const details = { '_id': new ObjectID(id) };
    const team = { team_name: req.body.team_name, team_rating: req.body.team_rating, 
    country: req.body.country, division: req.body.division };
    db.collection('teams').update(details, team, (err, result) => {
      if (err) {
          res.send({'error':'An error has occurred'});
      } else {
          res.send(team);
      } 
    });
  });

};