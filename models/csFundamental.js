const mongoose = require("mongoose");

const csFundamentalSchema = new mongoose.Schema({
  
  topicPages:[
    {
        id: Schema.Types.ObjectId,
        ref: "TopicPage",
    },
  ],

});

module.exports = mongoose.model("CsFundamental", csFundamentalSchema);