const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const adminSchema = mongoose.Schema(
    {
        username: {
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
        restoken: {
            type: String,
        },
        notifytime: {
            type: Number,
            default: 3,
        },
    },
    {timestamps: true}
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

    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_KEY)
    user.tokens = user.tokens.concat({token})
    await user.save();

    return token;
};

adminSchema.statics.findByCredentials = async function (username, password) {
    const user = await Admin.findOne({username});

    if (!user) {
        throw new Error("Invalid username or password");
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Invalid username or password");
    }
    return user;
};

adminSchema.statics.checkPassword = async function (user, password) {

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error("Password Does Not Match!");
    }
    const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_RES_KEY, {expiresIn: '5m'})
    user.restoken = token
    await user.save();
    return token;
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
