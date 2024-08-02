const express = require("express")
const cors = require('cors');
const { addAuthData, checkAuth } = require("./authPage");



const router = express.Router();

router.post("/authRegistration", addAuthData);
router.post("/authCheck", checkAuth);
// router.get("/getUpdate", getUpdate)


module.exports = router;