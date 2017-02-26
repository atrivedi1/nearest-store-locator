'use strict'

var Stores = require('./store_model');

module.exports = {
    addressInquiry: function(req, res, cb) {
        console.log("trying to make an inquiry:", req.body);
        res.status(200);
    }
}
