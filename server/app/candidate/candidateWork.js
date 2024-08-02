const express = require("express")
const cors = require('cors');
const { addCandidateData, getCandidateData, candidateAmountAdd } = require("./candidatePage");



const router = express.Router();

router.post("/addCandidateData", addCandidateData);
router.put ("/candidateAmount?id" , candidateAmountAdd);
router.get ("/getCandidateData?id", getCandidateData)

module.exports = router;