const mongoose = require("mongoose");

const languageFundamentalSchema = new mongoose.Schema({
  
  topicPages:[
    {
        id: Schema.Types.ObjectId,
        ref: "TopicPage",
    },
  ],

});

module.exports = mongoose.model("LanguageFundamental", languageFundamentalSchema);