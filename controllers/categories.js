var Categories = require('../models/categories');
exports.all = function(req, res) {
    Categories.all(function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.json(200, docs);
    });
};