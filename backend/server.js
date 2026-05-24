const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('CraveMate Backend is running!');
});

app.post('/api/orders', (req, res) => {
  const { items } = req.body;
  if (!items || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Order must contain items' });
  }

  // Mock order processing
  const orderId = Math.random().toString(36).substring(7);
  res.status(201).json({
    success: true,
    message: 'Order placed successfully',
    orderId,
    items
  });
});

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
