const express = require('express');
const multer = require('multer');
const ftp = require('basic-ftp');
const path = require('path');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Temporary storage for uploaded files

app.post('/upload', upload.single('file'), async (req, res) => {
  const { path: tempPath, originalname } = req.file;

  const client = new ftp.Client();
  client.ftp.verbose = true;

  try {
    // Connect to the FTP server
    await client.access({
      host: 'localhost', //This is the FTP Server Host
      user: 'tommylbro', //This is the FTP Username
      password: '18103@#$%ZXcv', //This is the FTP Password
      secure: false,
    });

    // Upload the file
    const remotePath = `/remote/folder/${originalname}`;
    await client.uploadFrom(tempPath, remotePath);

    res.status(200).send('File uploaded successfully!');
  } catch (error) {
    console.error('FTP Upload Error:', error);
    res.status(500).send('Failed to upload file.');
  } finally {
    await client.close();
  }
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
