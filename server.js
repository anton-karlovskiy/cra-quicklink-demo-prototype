
const express = require('express');
const path = require('path');

const app = express();
app.disable('x-powered-by');
app.use(express.static(path.join(__dirname, 'build')));

const PORT = process.env.PORT || 5000;

// need to declare a "catch all" route on your express server 
// that captures all page requests and directs them to the client
// the react-router do the route part
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
app.listen(
  PORT,
  () => {
    console.log(`Ready on http://localhost:${PORT}`);
  }
);
