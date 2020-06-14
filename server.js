var express = require("express");
var handlebars = require("express-handlebars");
var mongoose = require("mongoose");
var controller = require("./controller")

var PORT = process.env.PORT || 3000;

var app = express();
var hbs = handlebars.create({
    // Specify helpers which are only registered on this instance.
    helpers: {
        grouped_each: function (every, context, options) {
            var out = "", subcontext = [], i;
            if (context && context.length > 0) {
                for (i = 0; i < context.length; i++) {
                    if (i > 0 && i % every === 0) {
                        out += options.fn(subcontext);
                        subcontext = [];
                    }
                    subcontext.push(context[i]);
                }
                out += options.fn(subcontext);
            }
            return out;
        }
    }
});

app.engine('handlebars', hbs.engine);
// app.engine("handlebars", hbs.engine, handlebars({
//     defaultLayout: "main"
// }))

app.set("view engine", "handlebars");

app.use(express.urlencoded({
    extended: true
}))

app.use(express.json())

app.use(express.static("public"))

app.use(controller);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/nytimes")




app.listen(PORT, function () {
    console.log("app is listening http://localhost:" + PORT)
})