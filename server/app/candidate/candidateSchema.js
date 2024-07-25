const mongoose = require("mongoose");
const candidate = new mongoose.Schema({
  candidate_name: {
    type: String,
    require: true,
  },
  candidate_number: {
    type: Number,
    require: true,
  },
  candidate_category: {
    type: String,
    require: true,
  },
  candidate_gst: {
    type: String,
    require: true,
  },
  candidate_email: {
    type: String,
  },
  candidate_shopAddress: {
    type: String,
  },
  candidate_shopName: {
    type: String,
    require: true,
  },
  candidate_amount: {
    type: Number,
    require: true,
  },
});

let candidateData = mongoose.model("Candidate Detail", candidate);
module.exports = candidateData;
