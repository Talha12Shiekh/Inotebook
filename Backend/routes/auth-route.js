const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    let obj = { name: "Talha", email: "abc@gmail.com" }
    res.json(obj);
});

module.exports = router;