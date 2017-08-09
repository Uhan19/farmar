const express = require('express');
const path = require('path');
const app = express();
const productData = require('./productData.js');
const itemHandler = require('./itemHandler.js');
const env = require('./env.js');
const email = require('emailjs');
const server = email.server.connect({
  user: `${env.GMAIL_USERNAME}`,
  password: `${env.GMAIL_PASSWORD}`,
  host: 'smtp.gmail.com',
  ssl: true
});
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../public/Home.css')));

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
      name: req.query.item,
      itemHandler: itemHandler
    }
  });
});

app.get('/Invoice', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/Invoice.html'));
});

app.post('/Invoice', (req, res) => {
  console.log('req', req.body);
  const email = {
    from: req.body.FromEmail,
    body: req.body.EmailBody,
    cc: req.body.CCOption ? req.body.FromEmail : ''
  };
  res.sendFile(path.join(__dirname + '/../public/Invoice.html'));
  server.send(
    {
      text: 'from \n' + email.from + '\n\n\n' + email.body,
      from: `GTRagsupplies <${env.GMAIL_USERNAME}>`,
      to: `GTRagsupplies <${env.GMAIL_RECEIVER}>`,
      cc: 'else <hschan11@aim.com',
      subject: `Invoice request from ${email.body}`
    },
    (err, message) => {
      if (err) {
        console.log(err);
      }
    }
  );
  res.redirect('/InvoiceSent');
});

app.get('/InvoiceSent', (req, res) => {
  res.sendFile(path.join(__dirname + '/../public/InvoiceSent.html'));
});

app.listen(3000, () => {
  console.log('Famars are on the market');
});
