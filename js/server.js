const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser')

const app = express();
const PORT = 3000;

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'MENU.html'));
});


app.post('/calculate', (req, res) => {
    const {itemName, price, quantity} = req.body;

    if (quantity <= 0 || quantity > 10) {
        return res.status(404).send('Invalid quanity. Quantity should be between 1 and 10.');
    }

    const totalAmount = parseFloat(price) * parseInt(quantity);
    res.send({
        itemName,
        quantity,
        totalAmount
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
