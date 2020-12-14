const express = require('express');
const app = express();
const PORT = 8080;
const multer = require('multer');
const fs = require('fs');

const upload = multer({
  dest: 'tmp/',
  limits: {
    fileSize: 3000000,
  },
}).array('monfichier');

app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err instanceof multer.MulterError) {
      res.status(400).send('File exceeds 3Mo limit');
    } else if (err) {
      res.status(400).send('An error occured during upload');
    } else {
      req.files.forEach((file) => {
        fs.rename(file.path, 'public/files/' + file.originalname, (err) => {
          if (err) console.log(err);
          console.log('File successfully moved');
        });
      });
      res.status(200).send('Files succesfully send');
    }
  });
});

app.listen(PORT, () => {
  console.log(`Server listening port ${PORT}`);
});
