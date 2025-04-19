import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
// Next é para o express saber que é um middleware e que ele pode continuar a execução do código
const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Acesso Negado" });
  }

  try {
    // Verifica se o token é válido
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);

    // Pega o id do usuário que está dentro do token
    req.userId = decoded.id;
    next();
  } catch (error) {
    res.status(401).json({ error: "Token inválido" });
  }
};

export default auth;
