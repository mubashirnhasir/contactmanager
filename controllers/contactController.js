const asyncHandler = require("express-async-handler")
const Contact = require("../models/contactModel")
//@desc Get all contacts 
//@route GET /api/contacts
//@access public

const getContacts = asyncHandler(
    async (req, res) => {
        const contact = await Contact.find()
        res.status(200).json(contact)
    }
)



//@desc CREATE NEW contacts 
//@route POST /api/contacts
//@access public

const createContact = asyncHandler(async (req, res) => {
    // console.log("This is the requested body ======----======",req.body)
    const { name, email, phone } = req.body
    if (!name || !email || !phone) {
        res.status(400)
        throw new Error("All fields are mandatory")
    }

    const contact = await Contact.create({
        name,
        email,
        phone
    })
    res.status(201).json(contact)
})


//@desc Get a contacts 
//@route GET /api/contacts/:id
//@access public

const getOneContact = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            res.status(404)
            throw new Error("Cannot Find by id")
        }
        res.status(200).json(contact)
    }
)


//@desc Update a contacts 
//@route PUT /api/contacts/:id
//@access public

const updateContact = asyncHandler(async (req, res) => {
    const contact = await Contact.findById(req.params.id)
    if (!contact) {
        res.status(404)
        throw new Error("Cannot Find by id")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
    )

    res.status(200).json(updatedContact)
})



//@desc Delete a contact
//@route DELETE /api/contacts/:id
//@access public

const deleteContact = asyncHandler(
    async (req, res) => {
        const contact = await Contact.findById(req.params.id)
        if (!contact) {
            res.status(404)
            throw new Error("Cannot Find by id")
        }
        await Contact.deleteOne()
        res.status(200).json(contact)
    }
)



module.exports = { getContacts, createContact, updateContact, deleteContact, getOneContact };