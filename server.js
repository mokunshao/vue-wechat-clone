const express = require("express");
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require("mongoose");
const keys = require("./config/keys");
const user = require("./routes/api/user");

app.use("/api/user", user);

mongoose
  .connect(keys.mongoURI, { useNewUrlParser: true })
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch(error => {
    throw error;
  });

app.get("/", (req, res) => {
  res.send("dwewewe");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
