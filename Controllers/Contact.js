const Contact = require("../Models/Contact")

exports.AddContact = async(req,res)=>{
    try {

        const found = await Contact.findOne({email : req.body.email})

        if(found){
            return res.status(400).send('Email already exists')
        }

        const newContact = new Contact(req.body)

        await newContact.save()

        res.status(200).send({Msg :"Contact Added",newContact})
    } catch (error) {
        res.status(500).send('Could not add contact')
    }
}

exports.GetAllContacts = async(req,res)=>{
    try {
        const contacts = await Contact.find()

        res.status(200).send({Msg : "Contact list",contacts})
    } catch (error) {
        res.status(500).send('Could not get contacts')
    }
}

exports.DeleteContact= async(req,res)=>{
    try {
        const {id} = req.params

        await Contact.findByIdAndDelete(id)

        res.status(200).send("Contact deleted")
    } catch (error) {
        res.status(500).send('Could not delete contact')
    }
}

exports.UpdateContact = async(req,res)=>{
    try {
        const {id} = req.params

        await Contact.findByIdAndUpdate(id,{$set : req.body}) 

        res.status(200).send("Contact updated")
    } catch (error) {
        res.status(500).send('Could not update contact')
    }
    }

exports.GetOneContact = async(req,res)=>{
    try {
        const {id} = req.params

        const contact = await Contact.findById(id)

        res.status(200).send({Msg : "Contact",contact})
    } catch (error) {
        res.status(500).send('Could not get contact')
    }
}