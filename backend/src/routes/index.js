const express = require('express');
const router = express.Router();

const usuarioRoutes = require('./usuarioRoutes');
const chamadoRoutes = require('./chamadoRoutes');
const respostaRoutes = require('./respostaRoutes');
const categoriaRoutes = require('./categoriaRoutes');

router.use('/usuarios', usuarioRoutes);
router.use('/chamados', chamadoRoutes);
router.use('/respostas', respostaRoutes);
router.use('/categorias', categoriaRoutes);

module.exports = router;