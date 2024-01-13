const express = require("express");
const app = express();
const dotenv = require("dotenv");
const dbconnect = require("./db");
const userRouter = require("./router/user");
const PORT = process.env.PORT || 3000;
dotenv.config();
app.use(express.json());

//db connection
dbconnect(process.env.LOCAL_HOST)
  .then(() => {
    console.log("db connected");
  })
  .catch((err) => {
    console.log("Error: ", err);
  });

app.get("/", (req, res) => {
  res.send("Hello!!");
});

app.use("/user", userRouter);

app.listen(PORT, () => {
  console.log(`Connecting to port ${PORT}`);
});
