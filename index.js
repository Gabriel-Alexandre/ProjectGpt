const mongoose = require('mongoose');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
require('dotenv').config();
// Descomentar quando for executar a aplicação pela primeira vez
// require('./seed');

const uri = process.env.DATABASE_URL;

const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './pages/main.html'));
});

app.use(express.json());

// Configuração de rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

httpServer.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

// Configuração com banco de dados
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Conectado ao banco de dados');
})
.catch((error) => {
  console.error('Erro ao conectar ao banco de dados', error);
});