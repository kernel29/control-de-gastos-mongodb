const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const routerGastos =require('./routes/gasto.routes.js')
const routerGastosPorMes = require('./routes/gastosPorMes.routes.js');

app.use(express.json());


app.use(express.static(path.join(__dirname, 'public')))
app.listen(3000, ()=>{
    console.log('server listening on port 3000 ')
})

app.use('/gastos', routerGastos);
app.use('/gastosPorMes', routerGastosPorMes);


app.get('/', (req, resp)=>{
})




const URI = 'mongodb+srv://diwen2:EwuYnql3F1DVyMex@backenddb.qcsqczd.mongodb.net/misGastos'

mongoose.connect(URI)
.then(()=>{
    console.log('conectado a mongodb')
})
.catch( ()=>{
    console.log('connection failed')
})