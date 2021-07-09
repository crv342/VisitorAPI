const express = require("express");
const router = new express.Router();
const moment = require('moment');
const auth = require('../middleware/auth');
const Visitor = require('../model/visitor');

router.post('/visitor/checkin', async (req, res) => {
    try {
        const checkin = moment(new Date()).format('MMMM Do YYYY, hh:mm');
        const visitor = new Visitor(req.body)
        console.log(visitor)
        // visitor.checkIn = moment(new Date()).format('MMMM Do YYYY, hh:mm');
        // console.log(visitor)
        const resp = await visitor.save()
        console.log(resp)
        res.status(200).send(visitor)
    }
    catch (e) {
        console.log(e)
        res.status(400).send("went wrong");
    }

})

router.patch('/visitor/checkout/:id', async (req, res) => {
    const visitor = await Visitor.findById(req.params.id)
    visitor.checkOut = new Date();
    // visitor.checkOut = moment().format('MMMM Do YYYY, hh:mm');
    await visitor.save()
    res.status(200).send()
})
router.get('/visitor', async (req, res) => {
    try {
        if(req.query.checkedOut===false){
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
