const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { check, validationResult } = require('express-validator');

// const User = require('../models/User');
const db = require('../models');

// @route   GET api/contacts
// @desc    Get all users contacts
// @access  Private
router.get('/', auth, async (req, res) => {
    console.log(res.body);
    try {
        const contacts = await db.Contacts.findAll({
            where: { UserId: req.user.id },
            include: [db.User]
        });
        res.json(contacts);
        // console.log(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth
// @desc    Add new contacts
// @access  Private
router.post(
    '/',
    [
        auth,
        [
            check('name', 'Name is required')
                .not()
                .isEmpty()
        ]
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        console.log(req.body);
        const {
            name,
            email,
            phone,
            purchaseZipCode,
            notes,
            lastContacted,
            birthday,
            status,
            UserId
        } = req.body;

        try {
            const newContact = {
                name,
                email,
                phone,
                status,
                purchaseZipCode,
                notes,
                lastContacted,
                birthday,
                UserId
            };

            const contact = await db.Contacts.create(newContact);

            res.json(contact);
        } catch (err) {
            console.error(err.message);
            res.status(500).send('Server Error');
        }
    }
);

// @route   PUT api/contacts/:id
// @desc    Update contact
// @access  Private
router.put('/:id', auth, async (req, res) => {
    const {
        name,
        email,
        phone,
        purchaseZipCode,
        notes,
        lastContacted,
        birthday,
        status
    } = req.body;

    // Build contact object
    const contactFields = {};

    if (name) contactFields.name = name;
    if (email) contactFields.email = email;
    if (phone) contactFields.phone = phone;
    if (purchaseZipCode) contactFields.purchaseZipCode = purchaseZipCode;
    if (notes) contactFields.notes = notes;
    if (lastContacted) contactFields.lastContacted = lastContacted;
    if (birthday) contactFields.birthday = birthday;
    if (status) contactFields.status = status;

    console.log(req.params.id);

    try {
        let contact = await db.Contacts.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        });

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        //Make sure user owns contact
        console.log(contact.User.id);
        console.log(req.user.id);
        if (contact.User.id !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }
        console.log(req.body);
        contact = await db.Contacts.update(contactFields, {
            where: {
                id: req.params.id
            }
        });
        // contact = await Contact.findByIdAndUpdate(
        //     req.params.id,
        //     { $set: contactFields },
        //     { new: true }
        // );

        res.json(contact);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// // @route   PUT api/contacts/:id
// // @desc    Update contact
// // @access  Private
// router.put('/:id', (req, res) => {
//     res.send('Update contact');
// });

// @route   DELETE api/contacts/:id
// @desc    Delete contact
// @access  Private
router.delete('/:id', auth, async (req, res) => {
    try {
        let contact = await db.Contacts.findOne({
            where: {
                id: req.params.id
            },
            include: [db.User]
        });

        if (!contact) return res.status(404).json({ msg: 'Contact not found' });

        //Make sure user owns contact
        if (contact.User.id !== req.user.id) {
            return res.status(401).json({ msg: 'Not authorized' });
        }

        await db.Contacts.destroy({
            where: {
                id: req.params.id
            }
        });

        res.json({ msg: 'Contact removed' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
