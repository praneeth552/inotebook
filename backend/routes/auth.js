const express = require("express");
const router = express.Router();
const User = require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser")
const JWT_SECRET_KEY = "praneeth"


router.post('/createuser', [
    body('name', "Enter valid name").isLength({ min: 3 }),
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
        const salt = await bcrypt.genSalt(10)
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET_KEY)
        res.json({authToken})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Occured")
    }
})

router.post('/login', [
    body('email', "Enter email properly").isEmail(),
    body('password', "Password must be atleast 5 characters").exists()
], async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        return res.status(400).json({ error: errors.array() })
    }
    const {email, password} = req.body;
    try {
        let user = await User.findOne({email})
        if (!user){
            res.status(400).json({error: "Please enter correct credentials"})
        }

        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare){
            res.status(400).json({error: "Please enter correct credentials"})
        }

        const data = {
            user: {
                id: user.id
            }
        }
        const authToken = jwt.sign(data,JWT_SECRET_KEY)
        res.json({authToken})        
    } catch (error) {
        console.error(error.message);
        // return res.status(500).send("Internal Server Occured");
    }
})

router.post('/getuser',fetchuser, async (req, res) => {
    try{
        userId = req.user.id
        const user = await User.findById(userId).select("-password")
        res.send({user})
    } catch (error) {
        console.error(error.message);
        // return res.status(500).send("Internal Server Occured");
    }
})
module.exports = router