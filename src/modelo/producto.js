const {
    model,
    Schema
} = require("mongoose")
const nuevoProductoEsquema = new Schema({
    nombre: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
});
module.exports = model("Producto", nuevoProductoEsquema)