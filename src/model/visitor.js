const mongoose = require("mongoose");

const visitorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  checkIn: {
      type: Date,
      default: new Date()
  },
  checkOut: {
      type: Date,
  },
  host: {
      type: String,
      ref: 'Detail'
  },
  purpose: {
      type: String,
  }
});

const Visitor = mongoose.model('Visitor',visitorSchema)

module.exports = Visitor
