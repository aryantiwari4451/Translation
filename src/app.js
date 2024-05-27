const express = require('express'); // Import Express
const bodyParser = require('body-parser'); // Import body-parser
const translationRoutes = require('./routes/translationRoutes'); // Import routes

const app = express(); // Create an Express app

app.use(bodyParser.json()); // Middleware to parse JSON request bodies
app.use('/api/translate', translationRoutes); // Use the translation routes

app.use((req, res, next) => {
  const error = new Error('Not Found'); // Create a new error for not found routes
  error.status = 404; // Set the status to 404
  next(error); // Pass the error to the next middleware
});

app.use((error, req, res, next) => {
  res.status(error.status || 500).json({
    error: {
      message: error.message // Send the error message as a response
    }
  });
});

module.exports = app; // Export the app
