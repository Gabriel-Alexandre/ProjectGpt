const mongoose = require('mongoose');
const User = require('./models/User'); // Importe o modelo do usuário
const bcrypt = require('bcrypt');
require('dotenv').config();

const uri = process.env.DATABASE_URL;

// Conecte-se ao banco de dados
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Conectado ao banco de dados (SEED)');
})
.catch((error) => {
  console.error('Erro ao conectar ao banco de dados (SEED)', error);
});

const users = [];

async function createPassword() {
  // Gerar um salt para hashing
  const salt = await bcrypt.genSalt(10);

  // Hash da senha com o salt
  const hashedPassword = await bcrypt.hash("1q2w3E*", salt);

  users.push({ name: 'Gabriel', email: 'gabriel@example.com', password: hashedPassword, role: "admin" });
  users.push({ name: 'Laura Enjoadinha', email: 'laura@example.com', password: hashedPassword, role: "admin"});
  users.push({ name: 'Teste1', email: 'test1@example.com', password: hashedPassword, role: "user" })
}

createPassword()

// Função para adicionar os usuários ao banco de dados
async function seed() {
  try {
    await createPassword()
    // Limpe os dados existentes, se necessário
    await User.deleteMany();

    // Adicione os usuários de seed
    await User.insertMany(users);

    console.log('Dados de seed adicionados com sucesso');
  } catch (error) {
    console.error('Erro ao adicionar dados de seed:', error);
  } finally {
    // Encerre a conexão com o banco de dados
    mongoose.disconnect();
  }
}

// Execute o script de seed
seed();