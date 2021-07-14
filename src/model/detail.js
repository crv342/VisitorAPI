const mongoose = require("mongoose");

const hostSchema = mongoose.Schema(
  {
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
  },{ timestamps: true }
);

hostSchema.virtual("visitors", {
  ref: "Visitor",
  localField: "name",
  foreignField: "host",
});

const purposeSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
  },{ timestamps: true }
);

const detailSchema = mongoose.Schema({
  host: [hostSchema],
  purpose: [purposeSchema],
});

const Detail = mongoose.model("Detail", detailSchema);

module.exports = Detail

