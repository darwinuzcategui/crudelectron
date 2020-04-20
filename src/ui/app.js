//alert("Trabajando !!")
const productoFormulario = document.querySelector("#productoFormulario")
const productoNombre = document.querySelector("#productoNombre")
const productoDescripcion = document.querySelector("#productoDescripcion")
const productosListas = document.querySelector("#productosListas")

const { ipcRenderer } = require("electron")


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
function editarProducto(id) {
    actulizarStatus = true;
    idProductoActulizado = id;
    const productoEncontrado = productosGlobal.find(prod => prod._id === id);
    productoNombre.value = productoEncontrado.nombre;
    productoDescripcion.value = productoEncontrado.descripcion;
    console.log(id);
}
// function para los lista de productos
function renderProductos(productos) {
    productosListas.innerHTML = "";
    console.log(productos);
    productos.map(listProductos => {
        productosListas.innerHTML += `
        <li class="card">
        <h4>
        Productos Id ${listProductos._id}
        </h4>
        <p>Productos Nombre: ${listProductos.nombre}</p>
        <p>Descripcion Prod: ${listProductos.descripcion}</p>
        <button class="btn btn-danger" onclick="eliminarProducto('${listProductos._id}')">
        🗑 Delete
        </button>
        <button class="btn btn-secondary" onclick="editarProducto('${listProductos._id}')">
        ✎ Editar
        </button>
        
        </li>
        `;

    });
}
let productosGlobal = [];


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


        ipcRenderer.send("editar-producto", {...producto, idProductoActulizado });



    }



    productoFormulario.reset()
    productoNombre.focus();
    actulizarStatus = false
});

ipcRenderer.on("nuevo-producto-creado", (e, args) => {
    //    console.log(args)
    const productoNuevo = JSON.parse(args);
    productosGlobal.push(productoNuevo)
    renderProductos(productosGlobal)
    console.log(productoNuevo);
    alert("Productos Creado Satisfactoriamente !!")
    productoNombre.focus();
});
ipcRenderer.send("lista-productos");

ipcRenderer.on("envio-lista-productos", (e, args) => {
    productoNombre.focus();
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

ipcRenderer.on("actulizado-producto-existoso", (e, args) => {
    productoNombre.focus();
    console.log(args);
    const actulizadoProducto = JSON.parse(args);
    productosGlobal.map(p => {
        if (p._id === actulizadoProducto._id) {
            p.nombre = actulizadoProducto.nombre;
            p.descripcion = actulizadoProducto.descripcion
        }
        return p;


    });
    renderProductos(productosGlobal)


})