const express = require("express")

const { createUser, loginUser, currentUser } = require("../controllers/userController")
const validateTokenHandler = require("../middleware/validateTokenHandler")
const router = express.Router()


router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/current", validateTokenHandler , currentUser)


module.exports = router