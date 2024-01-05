const mongoose = require('mongoose');

const apiSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String, 
    required: false
  },
  image: {
    type: String, 
    required: false
  },
  price: {
    type: String || Number,
    required: false
  },
  condition: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: false
  },
  location: {
    type: String || Number,
    required: false
  },
  createdAt: {
    type: Date,
    default: Date.now  // Sets the default value to the current date and time when a new document is created
  }
},{ timestamps: true });

const apiModel = mongoose.model('olxApi', apiSchema);

module.exports = apiModel;
