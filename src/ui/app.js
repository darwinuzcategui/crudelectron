//alert("Trabajando !!")
const productoFormulario = document.querySelector("#productoFormulario")
const productoNombre = document.querySelector("#productoNombre")
const productoDescripcion = document.querySelector("#productoDescripcion")
const productosListas = document.querySelector("#productosListas")

const {
    ipcRenderer
} = require("electron")
let productosGlobal = [];

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
        <button>
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


    ipcRenderer.send("nuevo-producto", producto);
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

});