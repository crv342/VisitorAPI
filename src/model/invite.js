const mongoose = require("mongoose");
const validator = require("validator");

const inviteSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    trim: true,
    lowercase: true,
    validate(value) {
        if (!validator.isEmail(value)) {
            throw new Error("Email is invalid");
        }
    },
  },
  time: {
    type: Date,
  },
  host: {
      type: String,
      ref: 'Detail'
  },
  purpose: {
    type: String,
  },
  inviteCode: {
    type: Number,
  }
},{ 
  timestamps: true 
}
);

const Invite = mongoose.model('Invite',inviteSchema)

module.exports = Invite
