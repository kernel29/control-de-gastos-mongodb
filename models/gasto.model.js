const mongoose = require('mongoose');

const gastoSchema = mongoose.Schema({
    descripcion: String,
    precio: Number,
    moneda: String,
    categoria: String,
    fecha: Date
});

const Gasto = mongoose.model('Gasto', gastoSchema)

module.exports = Gasto
