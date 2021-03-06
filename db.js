var mongodb = require('mongodb');

var state = {
    db: null
};

exports.connect = function(url, done) {
    if (state.db) {
        return done();
    }
    mongodb.connect(url, function(err, db) {
        console.log("CONNECT TO DB " + url);
        if (err) {
            return done(err);
        }
        state.db = db;
        done();
    })
}

exports.get = function() {
    return state.db;
}