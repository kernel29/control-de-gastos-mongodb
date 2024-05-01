const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const routerGastos = require("./routes/gasto.routes.js");
const routerGastosPorMes = require("./routes/gastosPorMes.routes.js");
const dotEnv = require('dotenv');
dotEnv.config()

app.use(express.json());

const PORT = process.env.PORT;

app.use(express.static(path.join(__dirname, "public")));
app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
});

app.use("/gastos", routerGastos);
app.use("/gastosPorMes", routerGastosPorMes);

app.get("/", (req, resp) => {});



const URI = process.env.DATABASE_URL
mongoose
  .connect(URI)
  .then(() => {
    console.log("conectado a mongodb");
  })
  .catch(() => {
    console.log("connection failed");
  });
