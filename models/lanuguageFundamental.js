const mongoose = require("mongoose");

const languageFundamentalSchema = new mongoose.Schema({
  
  topicPages:[
    {
      id: mongoose.Schema.ObjectId,
        ref: "TopicPage",
    },
  ],

});

module.exports = mongoose.model("LanguageFundamental", languageFundamentalSchema);