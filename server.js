const express = require("express");
const _bodyParser = require("body-parser");

const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(_bodyParser.urlencoded({ extended: true }));

app.listen(3000, () => {
  console.log("Listening on port: 3000");
});

const homeRouter = require("./routes/home.js");
app.use("/home", homeRouter);
