import Usuario from "../models/Usuario.js";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import bcrypt from "bcrypt";

export const criarUsuario = async (req, res) => {
  try {
    const { nome, email, senha, perfil } = req.body;

    if (!nome || !email || !senha) {
      return res.status(400).json({ message: "Nome, email e senha são obrigatórios." });
    }

    const existente = await Usuario.findOne({ where: { email } })
    if (existente) {
      return res.status(409).json({ message: "Email já cadastrado." })
    }

    const senhaHash = await hashPassword(senha);

    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha: senhaHash,
      perfil: perfil || "cliente"
    });

    return res.status(201).json({
      message: "Usuário criado com sucesso!",
      usuario: {
        id: novoUsuario.id,
        nome: novoUsuario.nome,
        email: novoUsuario.email,
        perfil: novoUsuario.perfil,
        ativo: novoUsuario.ativo,
      },
    });
  } catch (error) {
    console.error("Erro ao criar usuário:", error);
    return res.status(500).json({ message: "Erro no servidor." })
  }
};

export const listarUsuarios = async (req, res) => {
  try {
    const usuarios = await Usuario.findAll({
      attributes: ["id", "nome", "email", "perfil", "ativo", "criado_em"],
      order: [["id", "ASC"]],
    });
    return res.status(200).json({ usuarios })
  } catch (error) {
    console.error("Erro ao listar usuários:", error);
    return res.status(500).json({ message: "Erro no servidor." })
  }
};

export const getUsuarioPorId = async (req, res) => {
  try {
    const { id } = req.params;

    if (req.user.perfil !== "adm" && req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: "Acesse negado." });
    }

    const usuario = await Usuario.findByPk(id, {
      attributes: ["id", "nome", "email", "perfil", "ativo", "criado_em"],
    })

    if (!usuario) {
      return res.status(400).json({ message: "Usuario não encontrado." });
    }

    return res.status(200).json({ usuario });
  } catch (error) {
    console.error("Erro ao buscar usuário:", error);
    return res.status(500).json({ message: "Erro no servidor" })
  }
};

export const atualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, email, perfil, ativo } = req.body;

    if (req.user.perfil !== "adm" && req.user.id !== parseInt(id)) {
      return res.status(403).json({ message: "Acesso negado!" })
    }

    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    usuario.nome = nome || usuario.nome;
    usuario.email = email || usuario.email;

    if (req.user.perfil === "adm") {
      if (perfil) usuario.perfil = perfil;
      if (ativo !== undefined) usuario.ativo = ativo;
    }

    await usuario.save();

    return res.status(200).json({
      message: "Usuário atualizado com sucesso!",
      usuario: {
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        perfil: usuario.perfil,
        ativo: usuario.ativo,
      },
    });
  } catch (error) {
    console.error("Erro ao atualizar usuário:", error);
    return res.status(500).json({ message: "Erro no servidor" });
  }
};

export const deletarUsuario = async (req, res) => { 
  try {
    const { id } = req.params;

    if (req.user.perfil !== "adm"){
      return res.status(403).json({ message: "Acesso negado!"});
    }
    
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." });
    }

    await usuario.destroy();

    return res.status(200).json({ message: "Usuário deletado com sucesso." });
  } catch (error) {
    console.error("Erro ao deleta usuário: ", error);
    return res.status(500).json({ message: "Erro no servidor" })
  }
 };

export const atualizarSenha = async (req, res) => { 
  try {
    const { senhaAtual, novaSenha } = req.body;
    const userId = req.user.id;

    if (!senhaAtual || !novaSenha) {
      return res.status(400).json({ message: "Informe a senha atual e a nova senha." })
    }

    const usuario = await Usuario.findByPk(userId);
    if (!usuario) {
      return res.status(404).json({ message: "Usuário não encontrado." })
    }

    const senhaCorreta = await bcrypt.compare(senhaAtual, usuario.senha);
    if (!senhaCorreta) {
      return res.status(401).json({ message: "Senha atual incorreta." })
    }

    const novaSenhaHash = await bcrypt.hash(novaSenha, 10);
    usuario.senha = novaSenhaHash;
    await usuario.save();

    return res.status(200).json({ message: "Senha atualizada com sucesso." })
  } catch (error) {
    console.error("Error ao atualizar senha.", error);
    return res.status(500).json({ message: "Erro no servidor." })
  }
 };
