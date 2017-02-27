'use strict'

var Store = require('./store_model');

module.exports = {
    closestStore: function(req, res, cb) {
        console.log("trying to make an inquiry:", req.body);
    }
}
