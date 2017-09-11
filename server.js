var express = require('express'),
    fs = require('fs'),
    app = express(),
    eps = require('ejs'),
    morgan = require('morgan'),
    cors  =  require('cors'),
    bodyParser = require('body-parser'),
    objectId = require('mongodb').ObjectID;
var categoriesController = require('./controllers/categories');
Object.assign = require('object-assign')

// parse application/x-www-form-urlencoded 
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json 
app.use(bodyParser.json())
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))
app.use(cors());
app.use(function(req, res, next) {
    console.log(req.method);
    if (req.method === 'OPTIONS') {
        console.log('!OPTIONS');
        var headers = {};
        // IE8 does not allow domains to be specified, just the *
        // headers["Access-Control-Allow-Origin"] = req.headers.origin;
        headers["Access-Control-Allow-Origin"] = "*";
        headers["Access-Control-Allow-Methods"] = "OPTIONS";
        headers["Access-Control-Allow-Credentials"] = false;
        headers["Access-Control-Max-Age"] = '86400'; // 24 hours
        headers["Access-Control-Allow-Headers"] = "X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept";
        res.writeHead(200, headers);
        next();
    } else {
        res.header('Access-Control-Allow-Origin', req.headers.origin);
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
});

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
    dbDetails = new Object();

var initDb = function(callback) {
    if (mongoURL == null)
        mongoURL = 'mongodb://127.0.0.1:27017'

    var mongodb = require('./db');

    mongodb.connect(mongoURL, function(err, conn) {
        if (err) {
            callback(err);
            return;
        }

        db = mongodb.get();
        dbDetails.databaseName = db.databaseName;
        dbDetails.url = mongoURLLabel;
        dbDetails.type = 'MongoDB';

        console.log('Connected to MongoDB at: %s', mongoURL);
    });
};

app.get('/data/migration', function(req, res) {
    if (!db) {
        initDb(function(err) {});
    }
    if (db) {
        var dataCategories = db.collection('categories');
        dataCategories.remove({});
        categories = require('./migration');
        dataCategories.insert(categories, function(err, result) {
            if (err)
                res.send(err);
            else
                res.send(result)
        });
    } else {
        res.send("Error migration");
    }
});


app.get('/', function(req, res,  next) {
    if (!db) {
        initDb(function(err) {});
    }
    if (db) {
        var col = db.collection('categories');

        col.find().toArray(function(err, docs) {
            if (err) {
                console.log(err);
                return res.sendStatus(500);
            }
            res.json(200, docs);
        });
    } else {
        res.send("O-o-o");
    }
});

app.route('/categories')
    .options(function(req, res) {
        console.log("options");
        res.send("OPTIONS");
    })
    .get(categoriesController.all) // Просмотр всех категорий
    .post(categoriesController.create);
// Добавление новой категории

app.get('/categories/:id', categoriesController.findById); // Просмотр категории id
app.put('/categories/:id', categoriesController.update); // Обновление категории id
app.delete('/categories/:id', categoriesController.delete); // Удаление категории id

app.get('/pagecount', function(req, res) {
    // try to initialize the db on every request if it's not already
    // initialized.
    if (!db) {
        initDb(function(err) {});
    }
    if (db) {
        db.collection('categories').count(function(err, count) {
            res.send('{ categories: ' + count + '}');
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