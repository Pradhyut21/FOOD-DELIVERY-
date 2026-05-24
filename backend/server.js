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

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
