const express = require("express");
let cors = require("cors");

const app = express();
const port = 4000;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(cors());

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// Home Page
const homeRouter = require("./routes/home.js");
app.use("/", homeRouter);
