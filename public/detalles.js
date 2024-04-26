const gastosFiltrados = JSON.parse(localStorage.getItem("gastos-filtrados"));
const categoria = localStorage.getItem("categoria");
const URL_API = "http://localhost:3000/gastos/";

renderizarCategoria(gastosFiltrados, categoria);

function renderizarCategoria(array, categoria) {
  console.log(categoria)
  
  const elementos = filtrarCategoria(array, categoria);
  const table = document.querySelector("table");
    while (table.firstChild) {
      table.removeChild(table.firstChild);
  }
  elementos.forEach((elemento) => {
    
    const row = table.insertRow();
    row.innerText= '';
    if (elemento.moneda === "bolivares") {
      row.innerHTML = `
        <td class="text-capitalize">${elemento.descripcion}</td>
        <td>${elemento.precio} Bs</td>
        <td><button type="button" class="btn btn-danger" id="${elemento._id}">borrar</button></td>
    `;
      const btnBorrar = document.getElementById(`${elemento._id}`);
      btnBorrar.addEventListener("click", (e) => {
        const id = e.target.id;
        fetch(URL_API + id, {
          method: "DELETE",
        })
          .then((resolve) => resolve.json())
          .then((mensaje) => console.log(mensaje))
          .then(()=>{
            // se crea la bandera en sessionStorage para indicar que se borro un dato y que se
            // debe regargar la pagina cuando se regrese a la pagina anterior
            sessionStorage.setItem('datoBorrado', 'true');
            
          })
        getGastos(URL_API)
        .then(data => renderizarCategoria(data, categoria)) 
      });
    } else {
      row.innerHTML = `
        <td class="text-capitalize">${elemento.descripcion}</td>
        <td>${elemento.precio} $</td>
        <td><button type="button" class="btn btn-danger" id="${elemento._id}">borrar</button></td>
    `;
      const btnBorrar = document.getElementById(`${elemento._id}`);
      btnBorrar.addEventListener("click", (e) => {
        const id = e.target.id;
        fetch(URL_API + id, {
          method: "DELETE",
        })
          .then((resolve) => resolve.json())
          .then((mensaje) => console.log(mensaje))
          .then(()=>{
            // se crea la bandera en sessionStorage para indicar que se borro un dato y que se
            // debe regargar la pagina cuando se regrese a la pagina anterior
            sessionStorage.setItem('datoBorrado', 'true')
          })
        getGastos(URL_API)
        .then(data => renderizarCategoria(data, categoria)) 
      });
    }
  });
}

async function getGastos(URL_API) {
  const response = await fetch(URL_API);
  const result = await response.json();
  return result;
}

function filtrarCategoria(array, categoria) {
  return array.filter((element) => element.categoria === categoria);
}
