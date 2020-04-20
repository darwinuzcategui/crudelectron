const { BrowserWindow, ipcMain } = require("electron");
const Producto = require("./modelo/producto");

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 700,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile("src/index.html")

}

ipcMain.on("nuevo-producto", async(e, args) => {
    //  console.log(object)
    console.log(args)
    const nuevoProducto = new Producto(args);
    const productoGrabado = await nuevoProducto.save();
    console.log(productoGrabado);
    e.reply("nuevo-producto-creado", JSON.stringify(productoGrabado));
});

// la lista de productos
ipcMain.on("lista-productos", async(e, args) => {
    const productos = await Producto.find();
    console.log(productos);
    // envio la lista de productos
    e.reply("envio-lista-produstos", JSON.stringify(productos))
});
// escuchamos el evento eliminar
ipcMain.on("eliminar-producto", async(e, args) => {
    console.log(args);
    const productoEliminado = await Producto.findByIdAndDelete(args)
    e.reply("eliminado-producto-exitoso", JSON.stringify(productoEliminado));

});

module.exports = { createWindow };