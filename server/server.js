require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const productData = require('./productData.js');
const email = require('emailjs');
const server = email.server.connect({
  user: `${process.env.GMAIL_USERNAME}`,
  password: `${process.env.GMAIL_PASSWORD}`,
  host: 'smtp.gmail.com',
  ssl: true
});
const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false,
}));
app.use(express.static(path.join(__dirname, '../public')));

app.set('view engine', 'pug');
app.set('views', './public'); //this is reading from public

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/Home.html'));
});

app.get('/Home', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/Home.html'));
});

app.get('/About', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/About.html'));
});

app.get('/Location', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/Location.html'));
});

app.get('/Services', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/Services.html'));
});

app.get('/Products', (req, res) => {
  res.render('ProductPage', { local: productData });
});

app.get('/ProductDetail', (req, res) => {
  res.render('ProductDetailPage', {
    local: {
      item: productData[req.query.item],
      name: req.query.item
    }
  });
});

app.get('/Quote', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/Quote.html'));
});

app.post('/Quote', (req, res) => {
  const emailBody = `From: ${req.body.Name} \n\nReturn Email: ${req.body.FromEmail}\n\nPhone Number: ${req.body
    .Phone} \n\n\n Message: ${req.body.EmailBody}`;

  const email = {
    from: req.body.Name,
    body: emailBody,
    cc: req.body.CCOption ? req.body.FromEmail : '',
    phone: req.body.Phone
  };
  res.sendFile(path.join(__dirname + '/../public/Quote.html'));
  server.send(
    {
      text: email.body,
      from: `GTRagsupplies <${process.env.GMAIL_USERNAME}>`,
      to: `GTRagsupplies <${process.env.GMAIL_RECEIVER}>, GTRagsupplies <${process.env.GMAIL_RECEIVER2}>`,
      cc: `${email.cc}`,
      subject: `Quote request from ${email.from}`
    },
    (err, message) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.redirect('/QuoteSent');
});

app.get('/QuoteSent', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/QuoteSent.html'));
});

// app.listen(process.env.PORT, () => {
app.listen(3000, () => {
  console.log('Famars are on the market');
});
