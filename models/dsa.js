const mongoose = require("mongoose");

const dsaSchema = new mongoose.Schema({
  
  topicPages:[
    {
      id: mongoose.Schema.ObjectId,
        ref: "TopicPage",
    },
  ],

});

module.exports = mongoose.model("Dsa", dsaSchema);