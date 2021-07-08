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
    res.send(Visitor)
})
router.get('/visitor', async (req, res) => {
    try {
        if(req.query.checkedIn){
            const visitor = await Visitor.find({ checkOut:false })
            if(!visitor){
                res.status(404).send()
            }
            res.send(visitor)
        }
        if(req.query.host){
            const visitor = await Visitor.find({ host:req.query.host })
            if(!visitor){
                res.status(404).send()
            }
            res.send(visitor)
        }
        // await req.user.populate('tasks').execPopulate()
        const visitor = await Visitor.find()
        if(visitor.length === 0){
            res.status(404).send()
        }
        res.send(visitor)
    } catch (e) {
        res.status(500).send()
    }
})


module.exports = router