class Gasto {
  constructor(descripcion, precio, moneda, categoria, fecha = new Date()) {
    this.descripcion = descripcion;
    this.precio = precio;
    this.moneda = moneda;
    this.categoria = categoria;
    this.fecha = new Date(fecha);
  }
}

const fecha = new Date();
let mes = fecha.getMonth() + 1;
let dia = fecha.getDate();
const ano = fecha.getFullYear();
if (dia < 10) dia = "0" + dia;
if (mes < 10) mes = "0" + mes;
document.getElementById("fecha").value = ano + "-" + mes + "-" + dia;

const url_api = "control-de-gastos-mongodb-production.up.railway.app/gastos";

document.getElementById("form").addEventListener("submit", function (e) {
  e.preventDefault();
  const gasto = Object.fromEntries(new FormData(e.target));
  form.reset(); // resetea el formulario con el id form
document.getElementById("fecha").value = ano + "-" + mes + "-" + dia;

  fetch(url_api, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(gasto),
  })
    .then((response) => response.json())
    .then((data) => console.log(data));
});



// resetear todos los datos
const btnBorrar = document.querySelector(".btn-borrar");

btnBorrar.addEventListener("click", () => {});
