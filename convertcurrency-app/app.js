const express = require('express');
const bodyParser = require('body-parser');
const app = express();

const PORT = process.env.PORT || 8080;

app.use(bodyParser.json());

let hardcodedRates = {
  USD: 1,
  SGD: 1.34,
  PHP: 55.49,
  MYR: 4.2,
  IDR: 15423.35,
};

app.get('/api/latest', (req, res) => {
  try {
    const responseData = {
      base: 'USD',
      date: getCurrentDate(),
      rates: { ...hardcodedRates },
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error handling /api/latest:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/api/convert/:currency', (req, res) => {
  try {
    const { currency } = req.params;

    if (!hardcodedRates.hasOwnProperty(currency)) {
      return res.status(400).json({ error: 'Invalid currency code' });
    }

    const conversionRate = hardcodedRates[currency];

    res.json({ from: 'USD', to: currency, rate: conversionRate });
  } catch (error) {
    console.error('Error handling /api/convert/:currency:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/api/latest', (req, res) => {
  try {
    const { rates } = req.body;

    if (!rates || typeof rates !== 'object') {
      return res.status(400).json({ error: 'Invalid request body' });
    }

    hardcodedRates = { ...hardcodedRates, ...rates };

    const responseData = {
      base: 'USD',
      date: getCurrentDate(),
      rates: { ...hardcodedRates },
    };

    res.json(responseData);
  } catch (error) {
    console.error('Error handling PUT /api/latest:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

function getCurrentDate() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
