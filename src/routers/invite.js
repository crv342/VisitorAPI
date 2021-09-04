const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth');
const Invite = require('../model/invite');
const sendInviteEmail = require('../email/invite');
// const sendSms = require('../sms/invite');

let code;

router.post('/invite', auth, async (req, res) => {
    try {
        const string = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

        const len = string.length;
        for (let i = 0; i < 6; i++) {
            code += string[Math.floor(Math.random() * len)];
        }
        const invite = new Invite({ ...req.body, inviteCode: code })
        await invite.save()
        sendInviteEmail(invite.email, invite.name, invite.host, invite.purpose, invite.inviteCode, invite.time)
        res.status(201).send(invite)
    } catch (e) {
        console.log(e.message)
        res.status(400).send({e: e.message});
    }
})

router.get('/invite', auth, async (req, res) => {
    try {
        const invite = await Invite.find()
        res.status(200).send(invite);
    } catch (e) {
        res.status(500).send({e: e.message})
    }
})

module.exports = router
