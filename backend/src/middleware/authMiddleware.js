import jwt from "jsonwebtoken";
import Usuario from "../models/Usuario";

const JWT_SECRET = process.env.JWT_SECRET || "senha_aleatoria";

export const authMiddleware = async (req, res, next) => {
  
  const authHeader = req.headers.authorization;

  if(!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Token não fornecido" })
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    const user = await Usuario.findByPk(decoded.id)
    if(!user || !user.ativo) {
      return res.status(401).json({ message: "Usuário inválido ou inativo" })
    }

    req.user = {
      id: user.id,
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
    };

    next();
  } catch (err) {
    console.error("Erro no authMiddleware:", err.message);
    return res.status(401).json({ message: "Token inválido ou expirado"})
  }
}