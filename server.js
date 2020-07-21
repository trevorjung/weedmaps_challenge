const express = require('express');
const bodyParser = require('body-parser');
const { Fruit } = require('./api/sequelize');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GETS
// fetch all fruits
app.get('/fruits', async (req, res) => {
  try {
    const fruit = await Fruit.findAll();
    if (fruit === null) {
      res.json({ error: 'Fruits not found' });
    } else {
      res.json(fruit);
    }
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

// query by only name
app.get('/fruit', async (req, res) => {
  try {
    const { name: fruitName } = req.query;
    if (fruitName === '') {
      return res.json({ error: 'No matching fruits' });
    }
    const fruit = await Fruit.findAll({ where: { name: { [Op.like]: `%${fruitName}%` } } });
    if (fruit === null || fruit.length === 0) {
      res.json({ error: 'No matching fruits' });
    } else {
      res.json(fruit);
    }
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));