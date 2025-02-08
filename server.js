const express = require('express');
const ftpClient = require('ftp'); // Install this using `npm install ftp`

const app = express();
app.use(express.urlencoded({ extended: true }));

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const client = new ftpClient();
  client.on('ready', () => {
    res.send('FTP Login Successful!');
    client.end();
  });

  client.on('error', (err) => {
    res.status(401).send('FTP Login Failed: ' + err.message);
  });

  client.connect({
    host: 'localhost', // Your FTP server host
    user: tommylbro, // Your FTP server username
    password: 18103@#$%ZXcv, // Your FTP server password
  });
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
