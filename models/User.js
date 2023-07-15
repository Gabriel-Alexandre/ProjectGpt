const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true
  },
  idade: {
    type: Number,
    required: true
  },
  sexo: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Outro'],
    required: true
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;