const express = require('express');
const bodyParser = require('body-parser');
const { User, GovernmentId, MedRec } = require('./api/sequelize');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// GETS
app.get('/users', async (req, res) => {
  // fetching a user should return associated medRec and governmentId as nested keys
  try {
    const user = await User.findOne({ where: req.query, include: [{ model: MedRec }, { model: GovernmentId }]});
    if (user === null) {
      res.json({ error: 'User not found' });
    } else {
      res.json(user);
    }
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

app.get('/medRecs', async (req, res) => {
  try {
    const medRec = await MedRec.findOne({ where: req.query });
    const expired = medRec && medRec.expirationDate.getTime() < new Date().getTime();
    if (expired) {
      res.json({ error: 'Medical Recommendation Expired' });
    } else {
      res.json(medRec);
    }
  } catch(err) {
    throw new Error(err);
  }
});

app.get('/governmentIds', async (req, res) => {
  try {
    const governmentId = await GovernmentId.findOne({ where: req.query });
    const expired = governmentId && governmentId.expirationDate.getTime() < new Date().getTime();
    if (expired) {
      res.json({ error: 'Government Id Expired' });
    } else {
      res.json(governmentId);
    }
    res.json(governmentId);
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});
//POSTS
app.post('/users', async (req, res) => {
  try {
    const { body } = req;
    const newUser = await User.create(body);
    res.json(newUser);
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

app.post('/medRecs', async (req, res) => {
  try {
    const { body } = req;
    const newMedRec = await MedRec.create(body);
    const expired = newMedRec && newMedRec.expirationDate.getTime() < new Date().getTime();
    if (expired) {
      res.json({ error: 'Medical Recommendation Expired' });
    } else {
      res.json(newMedRec);
    }
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

app.post('/governmentIds', async (req, res) => {
  try {
    const { body } = req;
    const newId = await GovernmentId.create(body);
    const expired = newId && newId.expirationDate.getTime() < new Date().getTime();
    if (expired) {
      res.json({ error: 'Government Id Expired' });
    } else {
      res.json(newId);
    }
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});
//PUTS
app.put('/users', async (req, res) => {
  try {
    console.log(req.body);
    const updatedUser = await User.update(req.body, { where: { id: req.body.id }});
    res.json(updatedUser);
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

app.put('/medRecs', async (req, res) => {
  try {
    const updatedMedRec = await MedRec.update(req.body, { where: { id: req.body.id }});
    res.json(updatedMedRec);
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

app.put('/governmentIds', async (req, res) => {
  try {
    const updatedId = await GovernmentId.update(req.body, { where: { id: req.body.id }});
    res.json(updatedId);
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});
//DELS
app.del('/users', async (req, res) => {
  try {
    await User.destroy({ where: req.query });
    res.send('Deleted User');
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

app.del('/medRecs', async (req, res) => {
  try {
    await MedRec.destroy({ where: req.query });
    res.send('Deleted Medical Recommendation');
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

app.del('/governmentIds', async (req, res) => {
  try {
    await GovernmentId.destroy({ where: req.query });
    res.send('Deleted Id');
  } catch(err) {
    console.log(err);
    throw new Error(err);
  }
});

app.listen(port, () => console.log(`Listening on port ${port}`));