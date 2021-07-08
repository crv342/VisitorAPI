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
  },
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
  },
);

const detailSchema = mongoose.Schema({
  host: [hostSchema],
  purpose: [purposeSchema],
});

const Detail = mongoose.model("Detail", detailSchema);

// const detailSchema = mongoose.Schema({
//   host: {
//     name: {
//       type: String,
//       required: true,
//       trim: true,
//     },
//     phone: {
//         type: Number,
//         required: true,
//         trim: true
//     },

//   },
//   purposes: [{
//       purpose: {
//           type: String
//       }
//   }]
// });
// console.log(detailSchema);

// const Detail = mongoose.model("Employee", detailSchema);

module.exports = Detail;
