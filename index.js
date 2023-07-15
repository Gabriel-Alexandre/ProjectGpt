const mongoose = require('mongoose');
const express = require('express');
const app = express();
const userRoutes = require('./routes/users');

app.use(express.json());

app.use('/users', userRoutes);

app.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

mongoose.connect('mongodb://localhost/projectgpt', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Conectado ao banco de dados');
  })
  .catch((error) => {
    console.error('Erro ao conectar ao banco de dados', error);
  });