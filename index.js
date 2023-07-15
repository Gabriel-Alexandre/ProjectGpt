const mongoose = require('mongoose');
const express = require('express');
const app = express();
const httpServer = require('http').createServer(app);
const io = require('socket.io')(httpServer);
const jwt = require('jsonwebtoken');
const userRoutes = require('./routes/users');
const authRoutes = require('./routes/auth');
require('./seed');

const path = require('path');

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, './pages/main.html'));
});

app.use(express.json());

// Configuração do Socket.IO
io.on('connection', (socket) => {
  
  // Verifique a validade e decodifique as informações do token usando a biblioteca JWT
  try {
    // Verificar e decodificar o token JWT
    const token = socket.handshake.auth.token;
    jwt.verify(token, 'E7&HNx%4j2QJ*$#S@fG7B6x5bvP3n9tr');

    console.log('Novo cliente conectado');

    // Lida com evento de nova mensagem enviada pelo cliente
    socket.on('chat message', (message) => {
      // Envia a mensagem recebida para todos os clientes conectados
      io.emit('chat message', message);
    });

    // Lida com evento de desconexão do cliente
    socket.on('disconnect', () => {
      console.log('Cliente desconectado');
    });

  } catch (error) {
    socket.disconnect(); // Desconecte o cliente se o token for inválido
  }
  
});

// Configuração de rotas
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

httpServer.listen(3000, () => {
  console.log('Servidor iniciado na porta 3000');
});

// Configuração com banco de dados
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