// Requiring mongodb connection url 
const MONGO_URL = require("../config/db_conector"); 
const mongoose = require("mongoose");
const Float = require('mongoose-float').loadType(mongoose, 8);

// Mongo connection
mongoose.Promise = global.Promise;
mongoose.connect(MONGO_URL, {useMongoClient: true});

const geoLocation = new mongoose.Schema({
    type: {
      type: String,
      default: 'Point'
    },
    coordinates: {
      type: [Float]
    }
}); 

const courierSchema = new mongoose.Schema({
    max_capacity: Number,
    firstName: String,
    lastName: String,
    active: Boolean,
    email: String,
    position: {
        lat: Float,
        lng: Float 
    },
    location: {
        type: geoLocation,
        index: '2dsphere'
    },
});

const CourierModel = mongoose.model('couriers', courierSchema);

module.exports = CourierModel;
