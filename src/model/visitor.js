const mongoose = require("mongoose");

const visitorSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  phone: {
      type: Number,
      required: true,
      trim: true,
  },
    address: {
      type: String,
    },
    gender: {
      type: String,
        trim:true,
    },
    dob: {
      type: String,
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
},{ timestamps: true }
);

const Visitor = mongoose.model('Visitor',visitorSchema)

module.exports = Visitor
