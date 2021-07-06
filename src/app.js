const express = require("express");
const cors = require("cors");
require("dotenv").config();
require("./db/mongoose");

const adminRouter = require("./routers/admin");
const visitorRouter = require("./routers/visitor");
const detailsRouter = require("./routers/detail");

const app = express();
app.use(cors());
app.use(express.json());
app.use(adminRouter);
app.use(visitorRouter);
app.use(detailsRouter);

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log("server is runnig on port " + port);
});
