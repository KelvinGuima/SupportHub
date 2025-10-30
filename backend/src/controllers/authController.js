import pool from "../config/db.js"
import { comparePassword } from "../utils/hashPassword.js"
import { generateToken } from "../utils/jwtUtils.js"

export const login = async (req, res) => {
    const { email, senha } = req.body;

    if (!email || !senha) {
        return res.status(400).json({ message: "E-mail e senha são obrigatorios"});
    }

    try {
        const [rows] = await pool.query("SELECT * FROM usuarios WHERE email = ?", [email]);
        if (rows.lenght === 0) {
            return res.status(401).json({ message: "Usuário não encontrado" });
        }

        const user = rows[0];
        const valid = await comparePassword(senha, user.senha);
        if (!valid) {
            return res.status(401).json({ message: "Senha incorreta" })
        }

        const token = generateToken(user);
        res.json({
            message: "Login realizado com sucesso",
            token,
            user: {
                id: user.id,
                nome: user.nome,
                email: user.email,
                perfil: user.perfil,
            },
        });
    } catch (err) {
        console.error("Erro no login:", err);
        res.status(500).json({ message: "Erro no servidor" })
    }
};