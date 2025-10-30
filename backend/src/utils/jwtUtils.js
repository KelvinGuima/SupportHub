import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "senha_aleatoria"

export const generateToken = (user) => {
  return jwt.sign(
    {
      id: user.id,
      nome: user.nome,
      email: user.email,
      perfil: user.perfil,
    },
    JWT_SECRET,
    { expiresIn: "2h" }
  );
}