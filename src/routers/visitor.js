const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth');
const Visitor = require('../model/visitor');
// const moment = require('moment');

router.post('/visitor/checkin', async (req, res) => {
    try {
        // const checkin = moment(new Date()).format('MMMM Do YYYY, hh:mm');
        const visitor = new Visitor(req.body)
        // visitor.checkIn = moment(new Date()).format('MMMM Do YYYY, hh:mm');
        await visitor.save()
        res.status(200).send(visitor)
    }
    catch (e) {
        res.status(400).send({e:e.message});
    }

})

router.patch('/visitor/checkout/:id', async (req, res) => {
    try {
        const visitor = await Visitor.findById(req.params.id)
        visitor.checkOut = new Date();
        // visitor.checkOut = moment().format('MMMM Do YYYY, hh:mm');
        await visitor.save()
        res.status(200).send()
    } catch (e) {
        res.status(500).send({e:e.message})
    }
})

router.get('/visitor', async (req, res) => {
    try {
        if(req.query.checkOut===null){
            const visitor = await Visitor.find({ checkOut:null })
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
        const visitor = await Visitor.find()
        // await visitor.populate('host').execPopulate()
        if(visitor.length === 0){
            res.status(404).send()
        }
        res.send(visitor)
    } catch (e) {
        res.status(500).send({e:e.message})
    }
})

module.exports = router
