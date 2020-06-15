var express = require("express");
var router = express();
var cheerio = require("cheerio");
var db = require("../models");
var axios = require("axios");
var count = 0;



router.get("/", function (req, res) {
    db.Article.find({ saved: false }).then(function (results) {
        var newResults = results.map(news => {
            return {
                headline: news.headline,
                summary: news.summary,
                URL: news.URL,
                image: news.image,
                id: news._id

            }
        })
        res.render("index", { news: newResults })
    })
})




router.get("/scrape", function (req, res) {
    db.Article.remove({}).then(function (results) {
        axios.get("https://stocknews.com/top-stories").then(function (results) {
            var $ = cheerio.load(results.data)

            const articles = [];
            $("div.margin-bottom").each(function (i, element) {
                var title = $(this).children("div.margin-top-mobile").children("div.pad-left").children("h3.pad-top").children("a").text();
                var link = $(this).children("div.margin-top-mobile").children("div.pad-left").children("h3.pad-top").children("a").attr("href");
                var summary = $(this).children("div.margin-top-mobile").children("div.pad-left").text();
                var image = $(this).children("div.no-mobile-pull").children("a").children("img").attr("data-src");

                articles.push({
                    headline: title,
                    summary: summary.replace(title, ""),
                    URL: "https://stocknews.com" + link,
                    image: image
                })
            })

            const articlesToSave = articles.map(article => db.Article.create(article));
            //Promise.allSettled(articlesToSave).then(() => {
                res.redirect('/');
            //}).catch(err => res.status(500).send(err));

        })

    })

})

router.get('/clear-all', (req, res) => {
    db.Article.deleteMany().then(() => {
        res.redirect('/')
    }).catch(err => {
        res.status(500).send(err)
    });
})

router.put("/api/posts/:articleId", (req, res) => {
    db.Article.findOneAndUpdate({ _id: req.params.articleId }, { saved: true }).then(() => {
        res.redirect('/')
    }).catch(err => {
        res.status(500).send(err)
    });
});

router.get('/saved', (req, res) => {
    db.Article.find({ saved: true }).then(function (results) {
        var newResults = results.map(news => {
            return {
                headline: news.headline,
                summary: news.summary,
                URL: news.URL,
                image: news.image,
                id: news._id

            }
        })
        res.render("saved", { news: newResults })
    })
})

router.delete("/api/posts/:articleId", (req, res) => {
    db.Article.deleteOne({ _id: req.params.articleId }).then(() => {
        res.send({ success: true })
    }).catch(err => {
        console.log('got heree ctchhh')
        res.status(500).send(err)
    });
});



module.exports = router;