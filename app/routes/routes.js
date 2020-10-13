const { ObjectID } = require("mongodb");

module.exports = function(app, db) {  
    app.post('/notes', (req, res) => {    
        console.log(req.body)    
        res.send('Hello')  
    });

    app.post('/notes/add', (req, res) => {
        const note = {
            text: req.body.body,
            title: req.body.title
        };
        db.collection('notes').insertOne(note, (err, result) => {
            console.log('NOTE', note)
            if (err) {
                console.log('ERROR',err)
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                res.send(result.ops[0]);
            }
        });
    });

    app.get('/notes/all', (req, res) => {
        db.collection('notes').find({}).toArray(function(err, result) {
            if (err) {
                console.log('An error has occurred', err)
                res.send({
                    'error': 'An error has occurred'
                });
            } else {
                console.log('result:', result)
                res.send(result);
            }
        });
    });

    app.delete('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        db.collection('notes').remove(details, (err, item) => {
            if (err) {
                res.send({'error':'An error has occured'});
            } else {
                res.send('Note ' + id + 'deleted!');
            }
        });
    });

    app.put ('/notes/:id', (req, res) => {
        const id = req.params.id;
        const details = { '_id': new ObjectID(id) };
        const note = { text: req.body.body, title: req.body.title };
        db.collection('notes').update(details, note, (err, result) => {
          if (err) {
              res.send({'error':'An error has occurred'});
          } else {
              res.send(note);
          } 
        });
      })

};
    