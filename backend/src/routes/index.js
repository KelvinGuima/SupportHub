import express from "express";
//import usuarioRoutes, { route } from "./usuarioRoutes.js"
//import chamadoRoutes from "./chamadoRoutes.js"
//import respostasRoutes from "./respostaRoutes.js"
//import categoriaRoutes from "./categoriaRoutes.js"
import authRoutes from "./authRoutes.js"

const router = express.Router();

router.use("/auth", authRoutes);
//router.use("/usuarios", usuarioRoutes);
//router.use("/chamados", chamadoRoutes);
//router.use("/respostas", respostasRoutes);
//router.use("/categorias", categoriaRoutes);

export default router;