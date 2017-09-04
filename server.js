var express = require('express'),
    fs = require('fs'),
    app = express(),
    eps = require('ejs'),
    morgan = require('morgan');

Object.assign = require('object-assign')

app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))

var port = process.env.PORT || process.env.OPENSHIFT_NODEJS_PORT || 8080,
    ip = process.env.IP || process.env.OPENSHIFT_NODEJS_IP || '0.0.0.0',
    mongoURL = process.env.OPENSHIFT_MONGODB_DB_URL || process.env.MONGO_URL,
    mongoURLLabel = "";

if (mongoURL == null && process.env.DATABASE_SERVICE_NAME) {
    var mongoServiceName = process.env.DATABASE_SERVICE_NAME.toUpperCase(),
        mongoHost = process.env[mongoServiceName + '_SERVICE_HOST'],
        mongoPort = process.env[mongoServiceName + '_SERVICE_PORT'],
        mongoDatabase = process.env[mongoServiceName + '_DATABASE'],
        mongoPassword = process.env[mongoServiceName + '_PASSWORD']
    mongoUser = process.env[mongoServiceName + '_USER'];

    if (mongoHost && mongoPort && mongoDatabase) {
        mongoURLLabel = mongoURL = 'mongodb://';
        if (mongoUser && mongoPassword) {
            mongoURL += mongoUser + ':' + mongoPassword + '@';
        }
        // Provide UI label that excludes user id and pw
        mongoURLLabel += mongoHost + ':' + mongoPort + '/' + mongoDatabase;
        mongoURL += mongoHost + ':' + mongoPort + '/' + mongoDatabase;

    }
}
var db = null,
    User = null;

var initDb = function(callback) {
    if (mongoURL == null)
        mongoURL = 'mongodb://127.0.0.1:27017'

    var mongoose = require("mongoose");
    var Schema = mongoose.Schema;
    if (mongoose == null) return;
    // для работы с promise
    mongoose.Promise = global.Promise;
    mongoose.connect(mongoURL, {
        useMongoClient: true,
    });
    db = mongoose;
    // установка схемы
    var userScheme = new Schema({
        name: String,
        age: Number
    }, { versionKey: false });
    User = mongoose.model("User", userScheme);
    var user = new User({
        name: "Bill",
        age: 45
    });

    user.save()
        .then(function(doc) {
            console.log("Сохранен объект", doc);
        })
        .catch(function(err) {
            console.log(err);
        });
    console.log('Connected to MongoDB at: %s', mongoURL);
};

app.get('/', function(req, res) {
    if (!db) {
        initDb(function(err) {});
    }
    if (db) {

        var users = User.find({}, function(err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log(docs);
            res.json(200, docs);
        });
    } else {
        res.send("O-o-o");
    }
});

app.get('/pagecount', function(req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function(err) {});
    }
    if (db) {

        var users = User.find({}).count(function(err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            console.log(docs);
            res.send("count" + docs);
        });
    } else {
        res.send('{ pageCount: -1 }');
    }
});

// error handling
app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something bad happened!');
});

initDb(function(err) {
    console.log('Error connecting to Mongo. Message:\n' + err);
});

app.listen(port, ip);
console.log('Server running on http://%s:%s', ip, port);

module.exports = app;