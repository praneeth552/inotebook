const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        number: 5,
        a : "Harsha"
    }
    res.json(obj)
})

module.exports = router
