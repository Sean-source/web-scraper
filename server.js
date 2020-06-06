var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var controller = require("./controller")

var PORT = process.env.PORT || 3000;

var app = express();

app.engine("handlebars", handlebars({
    defaultLayout: "main"
}))

app.set("view engine", "handlebars");

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static("public"))

app.use(controller);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytimes")

app.listen(PORT, function() {
    console.log("app is listening http://localhost:" + PORT)
})