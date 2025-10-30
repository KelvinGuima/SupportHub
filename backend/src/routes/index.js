import express from "express";
import usuarioRoutes, { route } from "./usuarioRoutes"
import chamadoRoutes from "./chamadoRoutes"
import respostasRoutes from "./respostaRoutes"
import categoriaRoutes from "./categoriaRoutes"
import authRoutes from "./authRoutes"

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/usuarios", usuarioRoutes);
router.use("/chamados", chamadoRoutes);
router.use("/respostas", respostasRoutes);
router.use("/categorias", categoriaRoutes);

export default router;