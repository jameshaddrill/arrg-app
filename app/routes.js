// routes ======================================================================

    var Player = require('./models/models.js')

    // expose the routes to our app with module.exports
    module.exports = function(app) {

    // api ---------------------------------------------------------------------

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

            var ident = (req.body.text).replace(/\s+/g, '');

            // create a new player, information comes from AJAX request from Angular
            Player.create({
                text : req.body.text,
                level : req.body.level,
                identifier : ident,
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

        // delete a player
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

        // show player's details
        app.get('/api/player/info/:player_id', function(req, res) {
            Player.findOne({
                _id : req.params.player_id
            }, function(err, player) {
                if (err)
                    res.send(err);
                res.json(player);
            });
        });

        // update a player's details
        app.post('/api/player/info/:player_id', function(req,res) {

            Player.findOneAndUpdate( { _id : req.params.player_id }, {
                text : req.body.text,
                level : req.body.level
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
/*
            Player.findOneAndUpdate( query, {
                text : req.body.text,
                level : req.body.level,
                indentifier : ident
            }, function(err, player) {
                if (err)
                    res.send(err);

                // get and return all the players after you edit this one
                Player.find(function(err, players) {
                    if (err)
                        res.send(err)
                    res.json(players);
                });
            });
        });*/

        // application -------------------------------------------------------------
        app.get('/', function(req, res) {
            res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
        });


        app.get('/attendance', function(req, res) {
            res.sendfile('./public/register.html'); // load the single view file (angular will handle the page changes on the front-end)
        });

    };
