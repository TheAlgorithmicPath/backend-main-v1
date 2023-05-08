const mongoose = require("mongoose");

const dsaSchema = new mongoose.Schema({
  
  topicPages:[
    {
        id: Schema.Types.ObjectId,
        ref: "TopicPage",
    },
  ],

});

module.exports = mongoose.model("Dsa", dsaSchema);