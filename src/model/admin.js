const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema(
  {
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
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    tokens: [
      {
        token: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

adminSchema.methods.toJSON = function () {
  const user = this;
  const userObj = user.toObject();

  delete userObj.password;
  delete userObj.tokens;

  return userObj;
};

adminSchema.methods.generateAuthToken = async function () {
  const user = this;
  user.tokens = user.tokens.concat({
    token: jwt.sign({ _id: user._id.toString() }, process.env.JWT_KEY),
  });
  await user.save();

  return token;
};

adminSchema.statics.findByCredentials = async function (username, password) {
  const user = Admin.findOne({ username });
  if (!user) {
    throw new Error("Invalid username or password");
  }

  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw new Error("Invalid username or password");
  }

  return user;
};

adminSchema.pre("save", async function (next) {
  const user = this;

  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
