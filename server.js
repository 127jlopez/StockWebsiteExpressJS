const express = require("express");

const app = express();
const port = 3000;
app.set("view engine", "ejs");
app.use(express.static("public"));

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});

// Home Page
const homeRouter = require("./routes/home.js");
app.use("/", homeRouter);
