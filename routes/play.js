var express = require("express");
var util = require("../config/util.js");
var router = express.Router();

const { Web3 } = require("web3");
const web3 = new Web3("https://bsc-dataseed1.binance.org/");
const abi = require("../config/abi.json");
const contract = new web3.eth.Contract(
  abi,
  "0x4691f60c894d3f16047824004420542e4674e621"
);

router.get("/", function (req, res) {
  res.render("partials/play", {
    title: "Chess Hub - Game",
    user: req.user,
    isPlayPage: true,
  });
});

router.post("/", function (req, res) {
  var side = req.body.side;
  //var opponent = req.body.opponent; // playing against the machine in not implemented
  var token = util.randomString(20);
  res.redirect("/game/" + token + "/" + side);
});

router.post("/calculate-claim-rewards", async function (req, res) {
  try {
    const token = req.body.token;
    const result = await contract.methods.calculateClaimRewards(token).call();
    res.send(result[0].toString());
  } catch (e) {
    console.log(e);
    res.statusCode = 500;
    res.send();
  }
});

module.exports = router;
