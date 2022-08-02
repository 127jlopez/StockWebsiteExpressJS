const express = require("express");
const router = express.Router();
const _parseFromDatabase = require("../public/ParseFromDatabase.js");
const _bodyParser = require("body-parser");

router.use(_bodyParser.urlencoded({ extended: true }));
c;

router.get("/getchartdata", async (req, res) => {});

/*router.get("/getbestdowdata", async (req, res) => {
  
});

router.get("/getworstsandp500data", async (req, res) => {
  
});

router.get("/getbestsandp500data", async (req, res) => {
  
}); */

module.exports = router;
