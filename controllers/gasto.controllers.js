const Gasto = require('../models/gasto.model.js');

const mesBuscado = new Date().getMonth() + 1;
    
const getGastoPorMes =  async (req, resp)=>{
    const mes = req.body.mes;
    try {

        const gastos = await Gasto.find({
            $expr: {
                $eq: [{ $month: '$fecha' }, mes] // 1 representa enero
            }
        });
        resp.status(200).json(gastos)
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
    
}


const getGastos = async (req, resp)=>{
    
    try {
        const gastos = await Gasto.find({
            $expr: {
                $eq: [{ $month: '$fecha' }, mesBuscado] // 1 representa enero
            }
        });
        resp.status(200).json(gastos)
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
    
}

const createGasto = async (req, resp)=>{
    try {
        const gasto = await Gasto.create(req.body);
        resp.status(200).json(gasto)
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
    
}

const updateGasto = async (req, resp)=>{
    try {
        const {id} = req.params;
        const gasto = await Gasto.findByIdAndUpdate(id, req.body);
        resp.status(200).json(gasto)
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
    
}

const deleteGasto = async (req, resp)=>{
    try {
        const {id} = req.params;
        const gasto = await Gasto.findByIdAndDelete(id)
        resp.status(200).json('gasto deleted')
    } catch (error) {
        resp.status(500).json({message: error.message})
    }
    
}

module.exports = {
    getGastoPorMes,
    getGastos,
    createGasto,
    updateGasto,
    deleteGasto
}


