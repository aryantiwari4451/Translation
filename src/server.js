const app = require('./app'); // Import the Express app
const port = process.env.PORT || 5000; // Get the port from environment variables or default to 5000

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Start the server and listen on the specified port
});
