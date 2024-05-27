const axios = require('axios');
const he = require('he'); // Import the he library to decode HTML entities
require('dotenv').config();

const translateText = async (req, res, next) => {
  const { text } = req.body; // Extract text from request body

  if (!text) {
    return res.status(400).json({ error: 'Text is required' }); // Send error if text is missing
  }

  const encodedParams = new URLSearchParams();
  encodedParams.set('q', text); // Set the text to translate
  encodedParams.set('target', 'fr'); // Set target language to French
  encodedParams.set('source', 'en'); // Set source language to English

  const options = {
    method: 'POST',
    url: 'https://google-translate1.p.rapidapi.com/language/translate/v2',
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      'Accept-Encoding': 'application/gzip',
      'X-RapidAPI-Key': process.env.RAPIDAPI_KEY,
      'X-RapidAPI-Host': 'google-translate1.p.rapidapi.com'
    },
    data: encodedParams,
  };

  try {
    const response = await axios.request(options); // Make the API request
    let translation = response.data.data.translations[0].translatedText; // Extract the translation

    translation = he.decode(translation); // Decode HTML entities

    res.status(200).json({ translation }); // Send the translation as a response
  } catch (error) {
    next(error); // Pass any error to the error handler
  }
};

module.exports = { translateText };
