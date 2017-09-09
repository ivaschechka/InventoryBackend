var db = require('../db');
exports.all = function(cb) {

    db.get().collection('categories').find().toArray(function(err, docs) {
        cb(err, docs);
    });
}