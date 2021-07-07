const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth')
const Detail = require('../model/detail')

router.post('/host/add',auth, async (req, res) => {
    const host = new Detail({host:req.body})
    await host.save()
    res.send(host)
})

router.delete('/host/remove/:id',auth, async (req, res) => {
    const host = await Detail.findByIdAndDelete({host:req.params.id})
    if(!host){
        res.status(404)
    }
    res.send(host)
})

module.exports = router