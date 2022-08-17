const contenedor = require("./contenedor.js")


nuevaTablaProductos = new contenedor("./options/mariaDB.js", "productos")
nuevaTablaMensajes = new contenedor("./options/SQLite3.js", "mensajes")