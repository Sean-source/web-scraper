var express = require("express");
var router = express();
var cheerio = require("cheerio");
var db = require("../models");
var axios = require("axios");
router.get("/scrape", function(req, res) {
      axios.get("https://www.nytimes.com/").then(function(results) {
          var $ = cheerio.load(results.data)

          $("")
      })
})

module.exports = router;