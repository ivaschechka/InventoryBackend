var express = require('express'),
    app = express(),
    cookieParser = require('cookie-parser'),
    cors  =  require('cors'),
    morgan = require('morgan'),
    bodyParser = require('body-parser'),
    session = require('express-session'),
    mongoDBStore = require('connect-mongodb-session')(session),
    crypto = require("crypto-js"),
    mongodb = require('./db'),
    objectId = require('mongodb').ObjectID,
    categoriesController = require('./controllers/categories');


Object.assign = require('object-assign');

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('combined'))

// app.use(cookieParser());
// app.use(session({
//     secret: "89ksmnfa9fhaspfmk",
//     store: new mongoDBStore({ uri: mongoURL }),
//     cookie: { httpOnly: true, maxAge: null }
// }));

app.options("*", cors());
app.use(function(req, res, next) {
    if (req.method === 'OPTIONS') {
        res.header("Access-Control-Allow-Origin", req.get("Origin") || "*");
        res.header('Access-Control-Allow-Methods', 'POST, GET, PUT, DELETE, OPTIONS');
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        res.sendStatus(200);
    } else {
        res.header('Access-Control-Allow-Origin', "*");
        res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }
});

var db = null,
    dbDetails = new Object();
var secretPass = '89jsdfk891enjkasd89';

var initDb = function(callback) {
    if (mongoURL == null) {
        //mongoURL = 'mongodb://127.0.0.1:27017';
        return;
    }
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
        var users = db.collection('users');
        users.remove({});
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
        initDb(function(err) {
            if (err)
                console.log(err);
        });
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
        res.sendStatus(500);
    }
});

app.route('/login')
    .post(function(req, res) {
        if (!db) {
            initDb(function(err) {});
        }
        if (db) {
            var col = db.collection('users');
            var log = req.body.login;
            var passw = crypto.AES.encrypt(req.body.password, secretPass).toString();
            col.findOne({ login: log, password: passw },
                function(err, docs) {
                    if (err) {
                        console.log(err);
                        req.session.authorized = false;
                        res.sendStatus(500);
                        return;
                    }
                    req.session.authorized = true;
                    res.sendStatus(200);
                });
        }
    });
app.route('/register')
    .get(function(req, res) {
        if (!db) {
            initDb(function(err) {});
        }
        if (db) {
            var col = db.collection('users');
            col.find().toArray(function(err, docs) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                res.send(200, docs);
            })
        }
    })
    .post(function(req, res) {
        if (!db) {
            initDb(function(err) {});
        }
        if (db) {
            var col = db.collection('users');
            var enc = crypto.AES.encrypt(req.body.password, secretPass).toString();
            var user = {
                login: req.body.login,
                email: req.body.email,
                password: enc
            }
            console.log(enc);
            col.insert(user, function(err, result) {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                    return;
                }
                req.session.authorized = true;
                res.sendStatus(200);
            });
        }
    });

app.route('/categories')
    .get(categoriesController.all) // Просмотр всех категорий
    .post(categoriesController.create); // Добавление новой категории

app.route('/categories/:id')
    .get(categoriesController.findById) // Просмотр категории id
    .put(categoriesController.update) // Обновление категории id
    .delete(categoriesController.delete); // Удаление категории id

app.get('/pagecount', function(req, res) {
    // if (req.session.authorized)
    //     console.log(req.session.authorized);
    res.send('Hello!!!');
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