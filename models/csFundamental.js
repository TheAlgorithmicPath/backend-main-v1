const mongoose = require("mongoose");

const csFundamentalSchema = new mongoose.Schema({
  
  topicPages:[
    {
      id: mongoose.Schema.ObjectId,
        ref: "TopicPage",
    },
  ],

});

module.exports = mongoose.model("CsFundamental", csFundamentalSchema);