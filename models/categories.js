var db = require('../db');
var objectId = require('mongodb').ObjectID;

exports.all = function(cb) {
    db.get().collection('categories').find().toArray(function(err, docs) {
        cb(err, docs);
    });
};

exports.findById = function(id, cb) {
    db.get().collection('categories').findOne({ _id: objectId(id) }, function(err, docs) {
        cb(err, docs);
    })
};

exports.create = function(category, cb) {
    db.get().collection('categories').insert(category, function(err, result) {
        cb(err, result);
    });
};

exports.update = function(id, data, cb) {
    db.get().collection('categories').updateOne({ _id: objectId(id) },
        data,
        function(err, result) {
            cb(err, result);
        });
};

exports.delete = function(id, cb) {
    db.get().collection('categories').deleteOne({ _id: objectId(id) }, function(err, result) {
        cb(err, result);
    });
}