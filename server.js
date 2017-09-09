var express = require('express'),
    fs = require('fs'),
    app = express(),
    eps = require('ejs'),
    morgan = require('morgan'),
    cors  =  require('cors'),
    bodyParser = require('body-parser'),
    objectId = require('mongodb').ObjectID,
    categoriesController = require('./controllers/categories');

Object.assign = require('object-assign')
var db = require('./db'),
    dbDetails = new Object();
app.engine('html', require('ejs').renderFile);
app.use(morgan('combined'))
app.use(cors());
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

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

var initDb = function(callback) {
    if (mongoURL == null)
        mongoURL = 'mongodb://127.0.0.1:27017'
    db.connect(mongoURL, function(err, conn) {
        if (err) {
            callback(err);
            return;
        }

        dbDetails.databaseName = db.get().databaseName;
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
        db.get().collection('categories').remove({});
        categories = require('./migration');
        db.get().collection('categories').insert(categories, function(err, result) {
            if (err)
                res.send(err);
            else
                res.send(result)
        });
    } else {
        res.send("Error migration");
    }
});


app.get('/categories', categoriesController.all); // Просмотр всех категорий
app.get('/categories/:id', categoriesController.findById); // Просмотр категории id
app.post('/categories', categoriesController.create); // Добавление новой категории
app.put('/categories/:id', categoriesController.update); // Обновление категории id
app.delete('/categories/:id', categoriesController.delete); // Удаление категории id

app.post('/products', function(req, res, next) {
    if (!db) {
        initDb(function(err) {});
    }
    if (db) {
        var categoriesDb = db.get().collection('categories');
        categoriesDb.findOne({ _id: objectId(req.body._id) }, function(err, doc) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            var category = doc;
            var product = {
                _id: objectId(),
                name: req.body.category.name,
                count: 0,
                imgPath: req.body.category.imgPath
            }

            category.products.push(product);

            categoriesDb.updateOne({ _id: category._id }, { $set: { products: category.products } },
                function(err, result) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                });
            res.json(200, product);
        })
    }
});

app.post('/products:id', function(req, res, next) {
    if (!db) {
        initDb(function(err) {});
    }
    if (db) {
        var categoriesDb = db.get().collection('categories');
        categoriesDb.findOne({ _id: objectId(req.body._id) }, function(err, doc) {
            if (err) {
                console.log(err);
                res.sendStatus(500);
            }
            var category = doc;
            var product = {
                _id: objectId(),
                name: req.body.category.name,
                count: 0,
                imgPath: req.body.category.imgPath
            }

            category.products.push(product);

            categoriesDb.updateOne({ _id: category._id }, { $set: { products: category.products } },
                function(err, result) {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    }
                });
            res.json(200, product);
        })
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