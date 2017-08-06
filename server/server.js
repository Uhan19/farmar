const express = require('express');
const path = require('path');
const app = express();
const productData = require('./productData.js');
const itemHandler = require('./itemHandler.js');

app.use(express.static(path.join(__dirname, '../assets')));
app.use(express.static(path.join(__dirname, '../public/Home.css')));

app.set('view engine', 'pug');
app.set('views', './public');

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

app.get('/Products', (req, res) => {
  res.render('ProductPage', { local: productData });
});

app.get('/ProductDetail', (req, res) => {
  res.render('ProductDetailPage', {
    local: {
      item: productData[req.query.item],
      name: req.query.item,
      itemHandler: itemHandler,
    },
  });
});

app.get('/Invoice', (req, res) => {
  //TODO Invoice
});

app.listen(3000, () => {
  console.log('Famars are on the market');
});
