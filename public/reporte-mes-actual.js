


// evento para que la pagina se recargue cuando se clickea el boton "atras" del navegador
window.addEventListener("pageshow", function (event) {
  // Verifica su se elimino algun dato
  if (sessionStorage.getItem("datoBorrado")) {
    // si se elimino un dato se recarga la pagina
    window.location.reload();
    // luego se elimina la bandera del sessionStore
    sessionStorage.removeItem("datoBorrado");
  } else {
    return;
  }
});

const URL_API = "http://localhost:3000/gastos";

const categorias = [
  "alimentacion",
  "transporte",
  "salud",
  "higiene",
  "casa",
  "ropa y calzado",
  "diversion y ocio",
  "cuentas y pagos",
  "mama",
  "titi",
  "otros",
];

getGastos(URL_API);

async function getGastos(URL_API) {
  const response = await fetch(URL_API);
  const result = await response.json();
  renderizarTotales(result);
}

function totalCategoria(array, categoria) {
  let totalBolivares = 0;
  let totalDolares = 0;
  array.forEach((element) => {
    if (element.categoria === categoria && element.moneda === "bolivares") {
      totalBolivares += element.precio;
    } else if (
      element.categoria === categoria &&
      element.moneda === "dolares"
    ) {
      totalDolares += element.precio;
    }
  });
  return { totalBolivares: totalBolivares, totalDolares: totalDolares };
}

function total(array) {
  let totalBolivares = 0;
  let totalDolares = 0;
  array.forEach((element) => {
    if (element.moneda === "bolivares") {
      totalBolivares += element.precio;
    } else {
      totalDolares += element.precio;
    }
  });
  return { bolivares: totalBolivares, dolares: totalDolares };
}

function renderizarTotales(array) {
  const table = document.querySelector(".table");
  categorias.forEach((categoria) => {
    const total = totalCategoria(array, categoria);
    const row = table.insertRow();
    row.innerHTML = `
      <td class="nombre-categoria text-capitalize">${categoria}</td>
      <td>${total.totalBolivares}</td>
      <td>${total.totalDolares}</td>
  `;
  });
  document.querySelectorAll(".nombre-categoria").forEach((element) => {
    const categoria = element.textContent;
    element.addEventListener("click", () => {
      localStorage.setItem("categoria", categoria);
      localStorage.setItem("gastos-filtrados", JSON.stringify(array));
      window.location.href = "./detalles.html";
    });
  });
  const totales = total(array);
  const row = table.insertRow();
  row.innerHTML = `
      <td class="text-capitalize fw-bold">Total</td>
      <td class="fw-bold">${totales.bolivares} Bs</td>
      <td class="fw-bold">${totales.dolares} $</td>
  `;
}
