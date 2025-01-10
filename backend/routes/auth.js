const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');

router.post('/createuser', [
    body('name', "Enter the name").isLength({ min: 3 }),
    body('email', "Enter email properly").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({ min: 5 }),
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ error: errors.array() })
    }
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: "sorry, a user with this email already exists" })
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })
        res.json(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occured")
    }
})

module.exports = router