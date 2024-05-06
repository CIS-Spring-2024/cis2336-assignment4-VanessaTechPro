// server.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'menu.html'));
});

app.post('/calculate', (req, res) => {
    const { itemName, price, quantity } = req.body;

    if (quantity <= 0 || quantity > 10) {
        return res.status(400).send('Invalid quantity. Quantity should be between 1 and 10.');
    }

    const totalAmount = parseFloat(price) * parseInt(quantity);
    res.json({ itemName, quantity, totalAmount });
});

app.get('/order_confirmation', (req, res) => {
    const { itemName, quantity, totalAmount } = req.query;
    res.sendFile(path.join(__dirname, 'order_confirmation.html'));
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
