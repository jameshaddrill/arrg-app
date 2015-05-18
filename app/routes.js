// routes ======================================================================

    var Player = require('./models/models.js')

    // expose the routes to our app with module.exports
    module.exports = function(app) {

    // api ---------------------------------------------------------------------

        app.get('/', function(request, response) {
    	  response.send('Hello world');
    	});


        // get all players
        app.get('/api/players', function(req, res) {

            // use mongoose to get all players in the database
            Player.find(function(err, players) {

                // if there is an error retrieving, send the error. nothing after res.send(err) will execute
                if (err)
                    res.send(err)

                res.json(players); // return all players in JSON format
            });
        });

        // create player and send back all players after creation
        app.post('/api/players', function(req, res) {

            // create a new player, information comes from AJAX request from Angular
            Player.create({
                text : req.body.text,
                level : req.body.level,
                done : false
            }, function(err, player) {
                if (err)
                    res.send(err);

                // get and return all the players after you create another
                Player.find(function(err, players) {
                    if (err)
                        res.send(err)
                    res.json(players);
                });
            });

        });

        // delete a players
        app.delete('/api/players/:player_id', function(req, res) {
            Player.remove({
                _id : req.params.player_id
            }, function(err, player) {
                if (err)
                    res.send(err);

                // get and return all the players after you create another
                Player.find(function(err, players) {
                    if (err)
                        res.send(err)
                    res.json(players);
                });
            });
        });

        // application -------------------------------------------------------------
        app.get('/', function(req, res) {
            res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
        });

        app.get('/attendance', function(req, res) {
            res.sendfile('./public/register.html'); // load the single view file (angular will handle the page changes on the front-end)
        });
    };
