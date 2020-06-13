var express = require("express");
var router = express();
var cheerio = require("cheerio");
var db = require("../models");
var axios = require("axios");


router.get("/", function(req, res) {
    db.Article.find({saved:false}).then(function(results) {
        var newResults = results.map(news => {
            return {
                headline: news.headline,
                summary: news.summary,
                URL: news.URL,
                image: news.image,
                id: news._id

            }
        })
        res.render("index", {news: newResults})
    })
})


router.get("/scrape", function (req, res) {
    db.Article.remove({}).then (function(results) {
        axios.get("https://stocknews.com/top-stories").then(function (results) {
            var $ = cheerio.load(results.data)
    
            $("div.margin-bottom").each(function (i, element) {
                var title = $(this).children("div.margin-top-mobile").children("div.pad-left").children("h3.pad-top").children("a").text();
                var link = $(this).children("div.margin-top-mobile").children("div.pad-left").children("h3.pad-top").children("a").attr("href");
                var summary = $(this).children("div.margin-top-mobile").children("div.pad-left").text();
                var image = $(this).children("div.no-mobile-pull").children("a").children("img").attr("data-src");
    
                console.log(title, link, summary, image)
                db.Article.create({
                    headline: title,
                    summary: summary.replace(title, "")  ,
                    URL: "https://stocknews.com" + link,
                    image: image
                })
    
    
            })
    
            res.send("scraping is completed");
        })

    })
  
})

module.exports = router;