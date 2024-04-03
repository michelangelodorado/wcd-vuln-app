const express = require('express');
const path = require('path');

const app = express();
const port = 3000;

// Define the static directory to serve files from
app.use('/home', express.static(path.join(__dirname, 'public')));

// Wildcard route to serve content from the /home directory
app.get('/home/*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}/home`);
});