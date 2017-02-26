var mongoose = require('mongoose');
var database = 'mongodb://localhost/store_locations';
mongoose.connect(database);


var Schema = mongoose.Schema;

var storeSchema = new Schema({
  Store_Name:  String,
  Store_Location: String,
  Address:   String,
  City: String,
  State: String,
  Zip_Code: String,
  Latitude: String,
  Longitude: String,
  County: String
});

var storeModel = mongoose.model("Stores", storeSchema);

module.exports = storeModel;