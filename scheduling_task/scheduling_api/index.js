const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require('dotenv');
const datasource = require("./src/datasource");
const userRouter = require("./src/routes/User");
const adminRoute = require("./src/routes/Admin");
const scheduleRoute = require("./src/routes/Schedule");
const { jobScheduler } = require("./src/cronJob");

const app = express();
dotenv.config();
const port = process.env.PORT;

app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:5173/"],
    methods: ["GET,POST,PATCH,PUT,DELETE"],
  })
);
app.use(bodyParser.json());
app.use("/user", userRouter);
app.use("/admin", adminRoute);
app.use("/schedule", scheduleRoute);
datasource
  .connect()
  .then(() => {
    console.log("database connected successfully");
    app.listen(port, () => {
      console.log(`server running on ${port}`);
      jobScheduler()
    });
  })
  .catch((error) => {
    console.log(error);
  });
