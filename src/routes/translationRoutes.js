const express = require('express'); // Import Express
const { translateText } = require('../controllers/translationController'); // Import the controller function

const router = express.Router(); // Create a new router

router.post('/', translateText); // Define a POST route for translation

module.exports = router; // Export the router
