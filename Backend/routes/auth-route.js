const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const { body, validationResult } = require('express-validator');

// Create a user using POST : "/api/auth". Doesn't required Auth
router.post("/", [
    body("email","Enter a valid email !").isEmail(),
    body("name","Enter a valid name !").isLength({ min: 3 }),
    body("password","Password must be at least 5 characters !").isLength({ min: 5 })
], (req, res) => {

    const errors = validationResult(req);

    if (errors.isEmpty()) {
        const user = new User(req.body);
        user.save();
        return res.json(req.body);
    }

    res.send({ errors: errors.array() });
});

module.exports = router;