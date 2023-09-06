const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
require("dotenv").config({ path: "config/config.env" });
const UserRouter = require("./routes/UserRoute");
const connectDB = require("./database/database");

app.use(express.json());
app.use(cookieParser());
// routes
app.use("/user", UserRouter);

//server start
app.get("/", (req, res) => {
  res.send("server is running");
});

app.listen(process.env.PORT, () => {
  connectDB();
  console.log(`server started on http://localhost:${process.env.PORT}`);
});
