const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    obj = {
        number: 52,
        k : "praneeth"
    }
    res.json(obj)
})

module.exports = router