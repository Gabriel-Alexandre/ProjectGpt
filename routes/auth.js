const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar se o usuário existe no banco de dados
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: 'Credenciais inválidas' });
    }

    // Verificar a senha do usuário
    user.comparePassword(password).then(response => {
      if(!response) {
        res.status(401).json({ error: 'Credenciais inválidas' });
      } else {
        // Gerar token JWT
        const token = jwt.sign({ userId: user._id }, 'E7&HNx%4j2QJ*$#S@fG7B6x5bvP3n9tr', { expiresIn: '3h' });

        // Retornar o token para o cliente
        res.json({ token });
      }
    })

  } catch (error) {
    res.status(500).json({ error: 'Erro ao fazer login' });
  }
});

router.post('/register', async (req, res) => {
  const { email } = req.body;

  try {
    // Verificar se o usuário já existe no banco de dados
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ error: 'O usuário já existe' });
    }

    // Criar um novo usuário
    await User.create(req.body);

    res.status(201).json({ message: 'Usuário registrado com sucesso' });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao registrar usuário' });
  }
});

module.exports = router;