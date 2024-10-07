const express = require('express');
const router = express.Router();
const { registerUser } = require('./db');

router.post('/register', async (req, res) => {
    const { location, measurement } = req.body;

    try {
        await registerUser(location, measurement);
        // Trigger notification logic (optional)
        res.status(200).send('User registered successfully');
    } catch (error) {
        console.error(error);
        res.status(500).send('Error registering user');
    }
});

module.exports = router;