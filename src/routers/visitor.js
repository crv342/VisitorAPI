const express = require("express");
const router = new express.Router();
const moment = require('moment');
const auth = require('../middleware/auth');
const Visitor = require('../model/visitor');

router.post('/visitor/checkin', async (req, res) => {
    const visitor = new Visitor(req.body)
    visitor.checkIn = moment().format('MMMM Do YYYY, hh:mm');
    await visitor.save()
    res.send(visitor)
})

router.patch('/visitor/checkout/:id', async (req, res) => {
    const visitor = await Visitor.findById(req.params.id)
    visitor.checkOut = moment().format('MMMM Do YYYY, hh:mm');
    await visitor.save()
    res.send()
})
// router.get('/visitor', async (req, res) => {
//     try {
//         await req.user.populate('tasks').execPopulate()
//         res.send(req.user.tasks)
//     } catch (e) {
//         res.status(500).send()
//     }
// })


module.exports = router