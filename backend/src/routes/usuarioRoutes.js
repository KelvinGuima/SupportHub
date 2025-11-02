import express from "express";
import {
  criarUsuario,
  listarUsuarios,
  obterUsuarioPorId,
  atualizarUsuario,
  deletarUsuario,
  atualizarSenha
} from "../controllers/usuarioController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { roleMiddleware } from "../middlewares/roleMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, roleMiddleware(["adm"]), criarUsuario);

router.get("/", authMiddleware, roleMiddleware(["adm"]), listarUsuarios);

router.get("/:id", authMiddleware, obterUsuarioPorId);

router.put("/:id", authMiddleware, atualizarUsuario);

router.delete("/:id", authMiddleware, roleMiddleware(["adm"]), deletarUsuario);

router.put("/alterar-senha/me", authMiddleware, atualizarSenha);

export default router;
