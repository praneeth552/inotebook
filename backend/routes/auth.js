const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');

router.post('/',[
    body('name', "Enter the name").isLength({min: 3}),
    body('email', "Enter email properly").isEmail(),
    body('password', "Password must be atleast 5 characters").isLength({min: 5}),
], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({error: errors.array()})
    }
    User.create({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    }).then(user => res.json(user))
    .catch(err => {console.log(err)
res.json({error: "Please Enter an unique value for the email", message: err.message})})
    
})

module.exports = router