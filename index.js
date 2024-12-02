const express = require('express');
const cors = require('cors');

const app = express();
const port = 3000;
app.use(cors());

app.use(express.static('static'));

let cart = [
  { productId: 1, name: 'Laptop', price: 50000, quantity: 1 },
  { productId: 2, name: 'Mobile', price: 20000, quantity: 2 },
];

// Endpoint 1
function addItemToCart(productId, name, price, quantity) {
  let addItems = { productId, name, price, quantity };
  cart.push(addItems);
  return cart;
}

app.get('/cart/add', (req, res) => {
  let productId = parseInt(req.query.productId);
  let name = req.query.name;
  let price = parseFloat(req.query.price);
  let quantity = parseInt(req.query.quantity);
  let result = addItemToCart(productId, name, price, quantity);
  res.json({ cartItems: result });
});

// Endpoint 2
function editQuantityInCart(productId, quantity) {
  for (let q = 0; q < cart.length; q++) {
    if (cart[q].productId === productId) {
      cart[q].quantity = quantity;
    }
    return cart;
  }
}

app.get('/cart/edit', (req, res) => {
  let productId = parseInt(req.query.productId);
  let quantity = parseInt(req.query.quantity);
  let result = editQuantityInCart(productId, quantity);
  res.json({ cartItems: result });
});

// Endpoint 3
function deleteItemFromCart(cart, productId) {
  return cart.productId != productId;
}

app.get('/cart/delete', (req, res) => {
  let productId = parseInt(req.query.productId);
  let result = cart.filter((cart) => deleteItemFromCart(cart, productId));
  res.json({ cartItems: result });
});

// Endpoint 4

app.get('/cart', (req, res) => {
  let result = cart;
  res.json({ cartItems: result });
});

// Endpoint 5
function totalQuantityOfItems() {
  let totalQuantity = 0;
  for (let t = 0; t < cart.length; t++) {
    totalQuantity += cart[t].quantity;
  }
  return totalQuantity;
}

app.get('/cart/total-quantity', (req, res) => {
  let result = totalQuantityOfItems();
  res.json({ totalQuantity: result });
});

// Endpoint 6
function totalPriceOfItems() {
  let totalPrice = 0;
  for (let p = 0; p < cart.length; p++) {
    totalPrice += cart[p].price * cart[p].quantity;
  }
  return totalPrice;
}

app.get('/cart/total-price', (req, res) => {
  let result = totalPriceOfItems();
  res.json({ totalPrice: result });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
