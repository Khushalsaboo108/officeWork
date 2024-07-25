const express = require("express")
const cors = require('cors');
const { addCandidateData } = require("./candidatePage");



const router = express.Router();

router.post("/addCandidateData", addCandidateData)


module.exports = router;