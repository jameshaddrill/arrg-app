// https://devcenter.heroku.com/articles/getting-started-with-nodejs
// https://devcenter.heroku.com/articles/getting-started-with-nodejs#push-local-changes
// https://scotch.io/tutorials/setting-up-a-mean-stack-single-page-application


// server.js

    // set up ========================
    var express  = require('express');
    var app      = express();                               // create our app w/ express
    var mongoose = require('mongoose');                     // mongoose for mongodb
    var morgan = require('morgan');             // log requests to the console (express4)
    var bodyParser = require('body-parser');    // pull information from HTML POST (express4)
    var nodemailer = require('nodemailer');     // require nodemailer for sending emails
    var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)

    // configuration =================

    app.set('port', (process.env.PORT || 5000));

    var database = require('./config/db');


    // nodemailer stuff
    // http://codeforgeek.com/2014/07/send-e-mail-node-js/
    // http://blog.ijasoneverett.com/2013/07/emailing-in-node-js-with-nodemailer/
    var smtpTransport = nodemailer.createTransport("SMTP",{
       service: "gmail",  // sets automatically host, port and connection security settings
       auth: {
           user: "arrgattendancemanager@gmail.com",
           pass: "4rrg-attendance"
       }
    });

    // sending email
    app.get('/send', function(req, res) {
        var mailOptions={
            to : "catriona.gilbert@gmail.com",
            subject : req.query.subject,
            html : req.query.text
        }
        smtpTransport.sendMail(mailOptions, function(error, response){
            if(error) {
                console.log(error);
                smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                res.end("error");
            } else {
                console.log("Message sent: " + response.message);
                smtpTransport.close(); // shut down the connection pool, no more messages.  Comment this line out to continue sending emails.
                res.end("sent");
            }


        });

    });


    // mongoose  =================

    mongoose.connect(process.env.MONGODB_URI);     // connect to mongoDB database

    app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
    app.use(morgan('dev'));                                         // log every request to the console
    app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
    app.use(bodyParser.json());                                     // parse application/json
    app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
    app.use(methodOverride());

    // load the routes
    require('./app/routes')(app);


    // listen (start app with node server.js) ======================================

    app.listen(app.get('port'), function() {
	  console.log('Node app is running on port', app.get('port'));
	});