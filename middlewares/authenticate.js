const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
  const token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'Token de autenticação não fornecido' });
  }

  try {
    // Verificar e decodificar o token JWT
    const tokeBody = token.split(' ');
    const decoded = jwt.verify(tokeBody[1], 'E7&HNx%4j2QJ*$#S@fG7B6x5bvP3n9tr');

    // Adicionar o ID do usuário decodificado ao objeto de solicitação (req)
    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token de autenticação inválido' });
  }
};

module.exports = authenticate;