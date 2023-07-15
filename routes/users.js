const express = require('express');
const router = express.Router();
const authenticate = require('../middlewares/authenticate');
const User = require('../models/User');

// Rota para listar todos os usuários
router.get('/', authenticate, async (req, res) => {
  try {
    // Verificar se o usuário é um administrador
    const user = await User.findById(req.userId);
    if (user.role !== 'admin') {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    // Realizar ação de listagem de usuários
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// Rota para obter um usuário específico por ID
router.get('/:id', authenticate, async (req, res) => {
  try {
    // Verificar se o usuário é o proprietário do usuário a ser consultado
    if (req.params.id !== req.userId) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    // Realizar ação de consulta do usuário
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar o usuário' });
  }
});

// Rota para atualizar um usuário existente
router.put('/:id', authenticate, async (req, res) => {
  try {
    // Verificar se o usuário é o proprietário do usuário a ser atualizado
    if (req.params.id !== req.userId) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    // Realizar ação de atualização do usuário
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao atualizar o usuário' });
  }
});

// Rota para excluir um usuário existente
router.delete('/:id', authenticate, async (req, res) => {
  try {
    // Verificar se o usuário é o proprietário do usuário a ser excluído
    if (req.params.id !== req.userId) {
      return res.status(403).json({ error: 'Acesso não autorizado' });
    }

    // Realizar ação de exclusão do usuário
    const user = await User.findByIdAndDelete(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'Usuário não encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Erro ao excluir o usuário' });
  }
});

module.exports = router;
