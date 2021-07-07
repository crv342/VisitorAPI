const express = require("express");
const router = new express.Router();
const auth = require("../middleware/auth");
const Admin = require("../model/admin");

router.post("/admin/signup", async (req, res) => {
  const user = new Admin(req.body);
  await user.save();
  res.send("okk");
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
  } catch (error) {
    res.status(400).send();
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
    res.status(500).send();
  }
});

router.get("/admin/me", auth, async (req, res) => {
  res.send(req.user);
});

router.patch("/admin/me", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "age"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.send(req.user);
  } catch (e) {
    res.status(400).send(e);
  }
});

module.exports = router;
