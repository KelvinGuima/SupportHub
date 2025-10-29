const express = require('express');
const router = express.Router();
const controller = require('../controllers/respostaController');

router.get('/chamado/:chamadoId', controller.listByChamado);
router.post('/', controller.create);

module.exports = router;