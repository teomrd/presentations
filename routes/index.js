const express = require("express");
const router = express.Router();
const auth = require("http-auth");

require("dotenv").load();

const aUnm = process.env.PRESO_CONTROLLER_NAME;
const aPw = process.env.PRESO_CONTROLLER_PW;

// Configure basic auth
var basic = auth.basic(
  {
    realm: "SUPER SECRET STUFF"
  },
  function(username, password, callback) {
    callback(username === aUnm && password === aPw);
  }
);

var authMiddleware = auth.connect(basic);

/* GET home page. */
router.get("/", function(req, res) {
  res.render("index", { title: "<%= pName %>" });
});

/* GET controller page. */
router.get("/control", authMiddleware, function(req, res) {
  res.render("control", { title: "<%= pName %> Controller" });
});

module.exports = router;
