const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  name: {
    type: String,
    required: true
  },
  age: {
    type: Number,
    required: true
  },
  sex: {
    type: String,
    enum: ['Masculino', 'Feminino', 'Outro'],
    required: true
  }
});

// Middleware para hash de senha antes de salvar
userSchema.pre('save', async function (next) {
  const user = this;

  // Verificar se a senha foi modificada ou é nova
  if (!user.isModified('password')) {
    return next();
  }

  try {
    // Gerar um salt para hashing
    const salt = await bcrypt.genSalt(10);

    // Hash da senha com o salt
    const hashedPassword = await bcrypt.hash(user.password, salt);

    // Substituir a senha original pela senha hash
    user.password = hashedPassword;

    next();
  } catch (error) {
    return next(error);
  }
});

// Método para comparar senhas
userSchema.methods.comparePassword = async function (password) {
  try {
    // Comparar a senha fornecida com a senha hash
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    throw new Error('Erro ao comparar as senhas');
  }
};

const User = mongoose.model('User', userSchema);

module.exports = User;