const express = require('express');
const router = express.Router();

const { getGastos, createGasto, updateGasto, deleteGasto} = require('../controllers/gasto.controllers');



router.get('/', getGastos);
router.post('/', createGasto);
router.put('/:id', updateGasto);
router.delete('/:id', deleteGasto);

module.exports = router;