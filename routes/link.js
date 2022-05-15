

const express = require("express")
const router = express.Router()
const linkController = require("../controllers/LinkController");

router.post("/add", linkController.add);
router.post("/getLinksByUserId", linkController.getLinksByUserId);


module.exports = router