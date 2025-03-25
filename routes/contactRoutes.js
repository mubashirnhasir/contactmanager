const express = require("express")

const router = express.Router()
const { getContacts ,createContact,deleteContact,updateContact,getOneContact } = require("../controllers/contactController")

router.route("/").get(getContacts).post(createContact)
router.route("/:id").get(getOneContact).put(updateContact).delete(deleteContact)




module.exports = router;