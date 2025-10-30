const express = require('express');
const router = express.Router();
const controller = require('../controllers/chamadoController.js');

router.get('/', controller.list);
router.get('/:id', controller.get);
router.post('/', controller.create);
router.put('/:id', controller.update);
router.post('/:id/close', controller.close);

module.exports = router;