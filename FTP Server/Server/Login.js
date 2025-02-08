const express = require('express');
const bodyParser = require('body-parser');
const ftp = require('ftp');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login page
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/login.html');
});

// Handle login form submission
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  // Connect to FTP server
  const client = new ftp();
  client.on('ready', () => {
    res.send('<h1>Welcome to the FTP Server</h1>');
    client.end();
  });

  client.on('error', (err) => {
    res.status(401).send('Login Failed: ' + err.message);
  });

  client.connect({
    host: 'localhost', // FTP Server Host
    user: tommylbro, // FTP Username
    password: , // FTP Password
    secure: false, // Set to true if FTPS is required
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
