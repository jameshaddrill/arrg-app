// https://devcenter.heroku.com/articles/getting-started-with-nodejs
// https://devcenter.heroku.com/articles/getting-started-with-nodejs#push-local-changes

// https://scotch.io/tutorials/creating-a-single-page--app-with-node-and-angular


// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    app.set('port', (process.env.PORT || 5000));

    mongoose.connect('mongodb://james:C4triona@ds031751.mongolab.com:31751/heroku_app36752299');     // connect to mongoDB database on modulus.io

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());


    // define model =================
    var Player = mongoose.model('Player', {
        text : String,
        level : String
    });


    // routes ======================================================================

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


    // listen (start app with node server.js) ======================================

    app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});