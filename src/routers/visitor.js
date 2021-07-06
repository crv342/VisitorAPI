const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth')
const Visitor = require('../model/visitor')

router.post('/visitor', async (req, res) => {
    const visitor = new Visitor(req.body)
    await visitor.save()
    res.send(visitor)
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