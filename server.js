import express from "express";

const app = express();

app.set("view engine", "ejs");

app.get("/", (req, res) => {
  // run code
  // then can send data to the user
  console.log("stop");
  res.render("index");
});

app.listen(3000); // runs our server at port 3000 for request

console.log("1");
