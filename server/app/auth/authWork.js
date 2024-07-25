const express = require("express")
const cors = require('cors');
const { addAuthData, chackAuth, getUpdate } = require("./authPage");



const router = express.Router();

router.post("/authRegistration", addAuthData);
router.post("/authCheck", chackAuth);
router.get("/getUpdate", getUpdate)


module.exports = router;