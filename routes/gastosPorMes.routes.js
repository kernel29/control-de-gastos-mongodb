const expres = require('express');
const router = expres.Router();
const { getGastoPorMes } = require('../controllers/gasto.controllers');


router.post('/', getGastoPorMes)

module.exports = router
