const express = require('express')
const app = express()
const port = 3001
const cors = require('cors');

const merchant_model = require('./merchantModel')

app.use(cors({
  origin: 'http://127.0.0.1:5173', // allow requests from this origin
  methods: 'GET,POST,PUT,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Access-Control-Allow-Headers'
}));

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});

app.get('/', (req, res) => {
  merchant_model.getMerchants()
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/users', (req, res) => {
  merchant_model.createUser(req.body)
  .then(user => {
    res.status(201).json(user); // Return the user data, including the user_id
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/ratings', (req, res) => {
  merchant_model.createRating(req.body)
    .then(response => {
      res.status(201).send(response);
    })
    .catch(error => {
      res.status(500).send(error);
    });
});

app.delete('/merchants/:id', (req, res) => {
  merchant_model.deleteMerchant(req.params.id)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})
app.put("/merchants/:id", (req, res) => {
  const id = req.params.id;
  const body = req.body;
  merchant_model
    .updateMerchant(id, body)
    .then((response) => {
      res.status(200).send(response);
    })
    .catch((error) => {
      res.status(500).send(error);
    });
});

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})