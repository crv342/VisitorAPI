const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Detail = require("../model/detail");

router.post("/host/add", auth, async (req, res) => {
  try {
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
      res.status(201).send(host);
  } catch (e) {
      res.status(500).send({e:e.message})
  }

});

router.patch("/host/update/:id", auth, async (req, res) => {
    try {
        const data = await Detail.find();
        const host = data[0].host.id(req.params.id)
        if (!host) {
            res.status(404).send()
        }
        Object.keys(req.body).forEach(update => (host[update] = req.body[update]));
        await data[0].save();
        res.status(200).send(host);
    } catch (e) {
        res.status(500).send({e:e.message});
    }
});


router.delete("/host/remove/:id", auth, async (req, res) => {
  try {
      const data = await Detail.find();

      if (data.length == 0) {
          res.status(404);
      }
      const host = data[0].host.id(req.params.id).remove()
      await data[0].save()
      res.status(200).send(host);
  } catch (e){
      res.status(500).send({e:e.message})
  }

});

router.get("/details",async (req, res) => {
    try {
        const data = await Detail.find();

        if (data.length == 0) {
            res.status(404);
        }
        res.send(data[0])
    } catch (e) {
        res.status(500).send({e:e.message})
    }

})

router.post("/purpose/add", auth, async (req, res) => {
    try {
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
        res.status(201).send(purpose);
    } catch (e) {
        res.status(500).send({e:e.message})
    }

});

router.delete("/purpose/remove/:id", auth, async (req, res) => {
    try {
        const data = await Detail.find();

        if (data.length == 0) {
            res.status(404);
        }
        const purpose = data[0].purpose.id(req.params.id).remove()
        await data[0].save()
        res.send(purpose);
    } catch (e) {
        res.status(500).send({e:e.message})
    }
});

module.exports = router;
