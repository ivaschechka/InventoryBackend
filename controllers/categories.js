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

exports.findById = function(req, res) {
    Categories.findById(req.params.id, function(err, docs) {
        if (err) {
            console.log(err);
            return res.sendStatus(500);
        }
        return res.json(200, docs);
    });
};

exports.create = function(req, res) {
    var category = {
        name: req.body.name,
        products: [],
        imgPath: req.body.imgPath
    };
    Categories.create(category, function(err, docs) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.json(200, category);
    });
};

exports.update = function(req, res) {
    var category = {
        name: req.body.name,
        products: req.body.products,
        imgPath: req.body.imgPath
    };
    Categories.update(req.params.id, category, function(err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.json(200, category);
    });
};

exports.delete = function(req, res) {
    Categories.delete(req.params.id, function(err, result) {
        if (err) {
            console.log(err);
            res.sendStatus(500);
        }
        res.json(200);
    })
}