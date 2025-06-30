const express = require("express");
const router = express.Router();
const User = require("../models/user-model");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middlewears/fetchuser");

const SECRET_KEY = "codertk";

// Create a user using POST : "/api/auth/createuser". No Login required
router.post("/createuser", [
    body("email", "Enter a valid email !").isEmail(),
    body("name", "Enter a valid name !").isLength({ min: 3 }),
    body("password", "Password must be at least 5 characters !").isLength({ min: 5 })
], async (req, res) => {
    const { name, email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }

    try {

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).send({ error: "Sorry! A user with this email already exists" });
        }

        const salt = await bcrypt.genSalt(10);

        const secPas = await bcrypt.hash(password, salt);

        user = await User.create({ name, email, password: secPas });

        const token = jwt.sign({ id: user._id }, SECRET_KEY);

        res.json({ token,success:true });

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred !");
    }
});

// Authenticate a user using POST : "/api/auth/login". No Login required
router.post("/login", [
    body("email", "Enter a valid email !").isEmail(),
    body("password", "Password cannot be blank !").exists()
], async (req, res) => {
    const { email, password } = req.body;
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).send({ errors: errors.array() });
    }
    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "Please try to login with correct credentials !" });
        }
        const passwordcompare = await bcrypt.compare(password, user.password);

        if (!passwordcompare) {
            return res.status(400).json({ error: "Please try to login with correct credentials !" });
        }

        const token = jwt.sign({ id: user._id }, SECRET_KEY);

        res.json({ token,success:true });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred !");
    }

});


// Get logged in user details using POST : "/api/auth/getuser". Login required
router.post("/getuser",fetchUser, async (req, res) => {

    try {
        const userid = req.verifiedid;
        const user = await User.findById(userid).select("-password");
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some Error occurred !");
    }

});


module.exports = router;