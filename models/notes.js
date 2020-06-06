var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var notesSchema = new Schema({
    headline: {type: String, required: true},
    summary: {type: String, required: true}
})

var Note = mongoose.model("Note", notesSchema)

module.exports = Note;