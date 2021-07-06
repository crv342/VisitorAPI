const express = require("express");
const router = new express.Router();
const auth = require('../middleware/auth')
const Detail = require('../model/detail')

router.post('/host', async (req, res) => {
    const host = new Detail({host:req.body})
    await host.save()
    res.send(host)
})


module.exports = router