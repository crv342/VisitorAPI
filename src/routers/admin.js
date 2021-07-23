const express = require("express");
const router = new express.Router();
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");
const Admin = require("../model/admin");
const Detail = require("../model/detail");
const sendOtpMail = require('../email/admin');

let otp;

router.post("/admin/signup", async (req, res) => {
    try {
        const user = new Admin(req.body);
        await user.save();
        const details = new Detail()
        await details.save();
        res.status(201).send();
    } catch (e) {
        res.status(500).send({e: e.message})
    }
});

router.post("/admin/login", async (req, res) => {
    try {
        if (req.body.username && req.body.password) {
            const user = await Admin.findByCredentials(
                req.body.username,
                req.body.password
            );
            const token = await user.generateAuthToken();
            res.status(200).send({user, token});
        } else {
            res.status(400).send()
        }
    } catch (e) {
        res.status(500).send({e: e.message});
    }
});

router.post("/admin/logout", auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token;
        });
        await req.user.save();

        res.send();
    } catch (e) {
        res.status(500).send({e: e.message});
    }
});

router.patch("/admin/update", auth, async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ["username", "email", "phone", "notifytime"];
    const isValidOperation = updates.every((update) =>
        allowedUpdates.includes(update)
    );

    if (!isValidOperation) {
        return res.status(400).send({error: "Invalid updates!"});
    }

    try {
        updates.forEach((update) => (req.user[update] = req.body[update]));
        await req.user.save();
        res.status(200).send(req.user);
    } catch (e) {
        res.status(400).send({e: e.message});
    }
});

router.post("/admin/checkpassword", auth, async (req, res) => {
    try {
        if (req.body.password) {
            const token = await Admin.checkPassword(
                req.user,
                req.body.password
            );
            res.status(200).send({token});
        } else {
            res.status(400).send({e: "Invalid Request"})
        }
    } catch (e) {
        res.status(400).send({e: e.message});
    }
});

router.post("/admin/forgetpassword", async (req, res) => {
    try {
        if (req.body.email) {
            const user = await Admin.findOne({email: req.body.email})
            if (!user) {
                throw new Error("User Not Found.")
            }
            if (req.body.otp) {
                if (req.body.otp !== otp) {
                    throw new Error('Otp Does Not Match')
                }
                const token = jwt.sign({_id: user._id.toString()}, process.env.JWT_RES_KEY, {expiresIn: '5m'})
                user.restoken = token
                await user.save();
                res.status(200).send({token});
            } else {
                const string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

                const len = string.length;
                for (let i = 0; i < 6; i++) {
                    otp += string[Math.floor(Math.random() * len)];
                }
                setTimeout(() => {
                    otp = ''
                }, 1000 * 60)
                sendOtpMail(user.email,user.username, otp)
                res.status(200).send();
            }
        } else {
            res.status(400).send({e: "Invalid Request"})
        }
    } catch (e) {
        res.status(404).send({e: e.message});
    }
});

router.patch("/admin/updatepassword", async (req, res) => {
    try {
        if (req.body.password) {
            const token = req.header('Authorization').replace('Bearer ', '')
            const decoded = jwt.verify(token, process.env.JWT_RES_KEY)
            const user = await Admin.findOne({_id: decoded._id, 'restoken': token})

            if (!user) {
                throw new Error()
            }
            user.password = req.body.password;
            await user.save();
            res.status(200).send();
        } else {
            res.status(400).send({e: "Invalid Request"})
        }
    } catch (e) {
        res.status(400).send({e: e.message});
    }
});


module.exports = router;
