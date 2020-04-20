//alert("Trabajando !!")
const productoFormulario = document.querySelector("#productoFormulario")
const productoNombre = document.querySelector("#productoNombre")
const productoDescripcion = document.querySelector("#productoDescripcion")
const productosListas = document.querySelector("#productosListas")

const {
    ipcRenderer
} = require("electron")

let productosGlobal = [];
let actulizarStatus = false;
let idProductoActulizado = "";

// funcuion para probar un click
function eliminarProducto(id) {
    //console.log("pulsarte un click! en id" + id);
    //vamos enviar un evento
    // validacion
    const resultado = confirm("Desea Eliminar este producto ?")
    if (resultado) {
        ipcRenderer.send("eliminar-producto", id);
    }
    return;



}

//  fuction editar
/*
function editTask(id) {
  updateStatus = true;
  idTaskToUpdate = id;
  const task = tasks.find(task => task._id === id);
  taskName.value = task.name;
  taskDescription.value = task.description;
}
 */
function editarProducto(id) {
    idProductoActulizado = id;
    const productoEncontrado = productosGlobal.find(prod => prodproductoEncontrado._id === id);
    productoNombre.value = productoEncontrado.nombre;
    productoDescripcion.value = productoEncontrado.descripcion;

    actulizarStatus = true
    console.log(id);
}
// function para los lista de productos
function renderProductos(productos) {
    productosListas.innerHTML = "";
    console.log(productos);
    productos.map(listProductos => {
        productosListas.innerHTML += `
        <li><h4>Productos Id ${listProductos._id}</h4>
        <p>Productos Nombre: ${listProductos.nombre}</p>
        <p>Descripcion Prod: ${listProductos.descripcion}</p>
        <button onclick="eliminarProducto('${listProductos._id}')">
        Eliminar
        </button>
        <button onclick="editarProducto('${listProductos._id}')">
        Editar
        </button>
        
        </li>
        `;

    });
}


productoFormulario.addEventListener("submit", evento => {
    evento.preventDefault();
    console.log("enviando " + productoNombre.value + " " + productoDescripcion.value)

    const producto = {
        nombre: productoNombre.value,
        descripcion: productoDescripcion.value
    }

    /*
     console.log(updateStatus);

  if (!updateStatus) {
    ipcRenderer.send("new-task", task);
  } else {
    ipcRenderer.send("update-task", { ...task, idTaskToUpdate });
  }
     */
    console.log(actulizarStatus);

    if (!actulizarStatus) {

        ipcRenderer.send("nuevo-producto", producto);

    } else {
        ipcRenderer.send("editar-producto", {...producto, id });


    }



    productoFormulario.reset()
});

ipcRenderer.on("nuevo-producto-creado", (e, args) => {
    //    console.log(args)
    const productoNuevo = JSON.parse(args);
    productosGlobal.push(productoNuevo)
    renderProductos(productosGlobal)
    console.log(productoNuevo);
    alert("Productos Creado Satisfactoriamente !!")
});
ipcRenderer.send("lista-productos");

ipcRenderer.on("envio-lista-produstos", (e, args) => {
    const productos = JSON.parse(args);
    //console.log(productos);
    // la paso al estado o la variable global
    productosGlobal = productos
    renderProductos(productosGlobal);
});
ipcRenderer.on("eliminado-producto-exitoso", (e, args) => {
console.log(args);
const productoEliminado = JSON.parse(args);
const nuevosProdutos = productosGlobal.filter(unProdu => {
    return unProdu._id !== productoEliminado._id;
});
productosGlobal = nuevosProdutos;
renderProductos(productosGlobal);


});

});