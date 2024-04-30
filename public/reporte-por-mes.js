

window.addEventListener("pageshow", function (event) {
  // Verifica su se elimino algun dato
  if (sessionStorage.getItem("datoBorrado")) {
    const objMes = {mes: sessionStorage.getItem('mes')};
    
    const URL_API = "http://localhost:3000/gastosPorMes";
    getGastos(URL_API, objMes );  
    // si se elimino un dato se recarga la pagina
    // window.location.reload();
    // luego se elimina la bandera del sessionStore
    sessionStorage.removeItem("datoBorrado");
  } else {
    return;
  }
});


async function getGastos(URL_API, mes) {
  const response = await fetch(URL_API, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(mes)
  });
  const result = await response.json();
  renderizarTotales(result);
}

const btnGenerar = document.querySelector(".btn-generar");

btnGenerar.addEventListener("click", () => {
  const objMes = {mes: Number(document.querySelector(".div-select").value)};
  sessionStorage.setItem('mes', objMes.mes);

  const URL_API = "control-de-gastos-mongodb-production.up.railway.app/gastosPorMes";

  getGastos(URL_API, objMes);
  
});

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

function totalCategoria(array, categoria) {
  let totalBolivares = 0;
  let totalDolares = 0;
  array.forEach((element) => {
    if (element.categoria === categoria && element.moneda === "bolivares") {
      const numero = Number(element.precio);
      totalBolivares += numero;
    } else if (
      element.categoria === categoria &&
      element.moneda === "dolares"
    ) {
      const numero = Number(element.precio);
      totalDolares += numero;
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
    } else if (element.moneda === "dolares") {
      totalDolares += element.precio;
    }
  });
  return { bolivares: totalBolivares, dolares: totalDolares };
}

function renderizarTotales(array) {
  const table = document.querySelector(".table");
  if (array.length === 0) {
    table.textContent = "No hay gastos";
    return;
  }
  table.textContent = "";

  categorias.forEach((categoria) => {
    const total = totalCategoria(array, categoria);
    const row = table.insertRow();
    row.innerHTML = `
      <td class="nombre-categoria text-capitalize" data-bs-target="#staticBackdrop">${categoria}</td>
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
