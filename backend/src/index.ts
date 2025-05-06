import express from 'express';

const app = express();
const PORT = 3001;

const data = require('../data/data.json');
const users = require('../data/users.json');

app.get('/api', (req, res) => {
  res.send('Hello from backend!');
});

app.get('/api/greet', (req, res) => {
  res.send('Hello !');
});

app.get('/api/getData', (req, res) => {
  res.json(data);
});

app.get('/api/getUsers', (req, res) => {
  res.json(users);
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});