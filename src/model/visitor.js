const mongoose = require("mongoose");

const visitorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  checkIn: {
      type: Date,
      default: Date.now()
  },
  checkOut: {
      type: Date,
      default: false,
  },
  host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Detail'
  },
  purpose: {
      type: String,
  }
});

const Visitor = mongoose.model('Visitor',visitorSchema)

module.exports = Visitor
