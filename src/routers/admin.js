const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Admin = require("../model/admin");
const Detail = require("../model/detail");

router.post("/admin/signup", async (req, res) => {
  try {
    const user = new Admin(req.body);
    await user.save();
    const details = new Detail()
    await details.save();
    res.status(201).send();
  } catch (e) {
    res.status(500).send({e:e.message})
  }
});

router.post("/admin/login", async (req, res) => {
  try {
    if (req.body.username && req.body.password) {
      const user = await Admin.findByCredentials(
        req.body.username,
        req.body.password
      );
      const token = await user.generateAuthToken();
      res.status(200).send({ user, token });
    } else {
      res.status(400).send()
    }
  } catch (e) {
    res.status(500).send({e:e.message});
  }
});

router.post("/admin/logout", auth, async (req, res) => {
  try {
    req.user.tokens = req.user.tokens.filter((token) => {
      return token.token !== req.token;
    });
    await req.user.save();

    res.send();
  } catch (e) {
    res.status(500).send({e:e.message});
  }
});

router.patch("/admin/update", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["username", "email","phone"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.status(200).send(req.user);
  } catch (e) {
    res.status(400).send({e:e.message});
  }
});

router.post("/admin/checkpassword", auth, async (req, res) => {
  try {
    if (req.body.password) {
      await Admin.checkPassword(
          req.user,
          req.body.password
      );
      res.status(200).send();
    } else {
      res.status(400).send({e:"Invalid Request"})
    }
  } catch (e) {
    res.status(400).send({e:e.message});
  }
});

router.post("/admin/updatepassword", async (req, res) => {
  try {
    if (req.body.password) {
      await Admin.checkPassword(
          req.user,
          req.body.password
      );
      res.status(200).send();
    } else {
      res.status(400).send({e:"Invalid Request"})
    }
  } catch (e) {
    res.status(400).send({e:e.message});
  }
});

router.post('/admin/forgetpassword/')

module.exports = router;
