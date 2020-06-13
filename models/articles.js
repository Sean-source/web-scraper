var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var articleSchema = new Schema({
    headline: {type: String, required: true},
    summary: {type: String, required: true},
    URL: {type: String, required: true},
    image: {type: String, required: true},
    saved:{type:Boolean, default:false},
    note:[{
        type:Schema.Types.ObjectId, 
        ref: "Note"
    }]
})

var Article = mongoose.model("Article", articleSchema)

module.exports = Article;