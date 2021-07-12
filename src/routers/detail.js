const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Detail = require("../model/detail");

router.post("/host/add", auth, async (req, res) => {
  let host;
  var dataObj = await Detail.find();

  if (dataObj.length !== 0) {
    dataObj[0].host.push(req.body);
    await dataObj[0].save()
    host = dataObj[0]
  } else {
    dataObj = new Detail({ host: req.body });
    await dataObj.save();
    host = dataObj;
  }

  res.send(host);
});

router.delete("/host/remove/:id", auth, async (req, res) => {
  const data = await Detail.find();

  if (data.length == 0) {
    res.status(404);
  }
  const host = data[0].host.id(req.params.id).remove()
  await data[0].save()
  res.send(host);
});

router.get("/details",async (req, res) => {
    const data = await Detail.find();

    if (data.length == 0) {
        res.status(404);
      }
    res.send(data[0])
})

router.post("/purpose/add", auth, async (req, res) => {
    let purpose;
    var dataObj = await Detail.find();

    if (dataObj.length !== 0) {
        dataObj[0].purpose.push(req.body);
        await dataObj[0].save()
        purpose = dataObj[0]
    } else {
        dataObj = new Detail({ purpose: req.body });
        await dataObj.save();
        purpose = dataObj;
    }

    res.send(purpose);
});

router.delete("/purpose/remove/:id", auth, async (req, res) => {
    const data = await Detail.find();

    if (data.length == 0) {
        res.status(404);
    }
    const purpose = data[0].purpose.id(req.params.id).remove()
    await data[0].save()
    res.send(purpose);
});

router.put("/purpose", auth, async (req, res) => {
    const data = await Detail.find();

    if (data.length == 0) {
        res.status(404);
      }
    data[0].purpose = req.body.purpose
    await data[0].save()
    res.status(200).send(data[0].purpose)
});

module.exports = router;
