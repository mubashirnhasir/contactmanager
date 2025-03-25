const express = require("express")

const { createUser, loginUser, currentUser } = require("../controllers/userController")
const router = express.Router()


router.post("/register", createUser)
router.post("/login", loginUser)
router.get("/current", currentUser)


module.exports = router