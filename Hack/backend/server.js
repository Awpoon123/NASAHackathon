const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');
const routes = require('./routes');
const app = express();
require('dotenv').config();

app.use(bodyParser.json());
app.use(express.static('public')); // Serve static files

// Initialize routes
app.use(routes);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});