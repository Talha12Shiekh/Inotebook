const mongoose = require("mongoose");
const { Schema } = mongoose;

const NotesSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    tag: { type: String, default: "general" },
    date: { type: Date, default: Date.now },
    user: { type: Schema.Types.ObjectId,ref:"User" }
});

module.exports = mongoose.model("Notes", NotesSchema);