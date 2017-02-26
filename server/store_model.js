var mongoose = require('mongoose');
var database = 'mongodb://localhost/store_locations';
mongoose.connect(database);


var Schema = mongoose.Schema;

var storeSchema = new Schema({
  "Store Name":  String,
  "Store Location": String,
  Address: String,
  City: String,
  State: String,
  "Zip Code": String,
  Latitude: String,
  Longitude: String,
  County: String
});

var storeModel = mongoose.model("Stores", storeSchema);

module.exports = storeModel;