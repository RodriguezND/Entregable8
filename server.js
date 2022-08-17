const express = require("express")
const { Server: HttpServer } = require("http")
const moment = require("moment")
const { Server: IOServer } = require("socket.io")
const fs = require("fs")

const contenedor = require("./contenedor.js")

const app = express()
const httpServer = new HttpServer(app)
const io = new IOServer(httpServer)


app.set('view engine', 'ejs');

app.use(express.static('./public'))

app.use(express.static("public"))

nuevaTablaProductos = new contenedor("./options/mariaDB.js", "productos")
nuevaTablaMensajes = new contenedor("./options/SQLite3.js", "mensajes")

let listaProductos = []
let listaMensajes = []

httpServer.listen(8080, () => {
    console.log('Servidor corriendo en http://localhost:8080');
})


io.on('connection', function(socket) {
    console.log('Un cliente se ha conectado');

    nuevaTablaMensajes.getAll().then(saraz => {
                
        listaMensajes = Object.values(JSON.parse(JSON.stringify(saraz)));

        io.sockets.emit('mensajes', listaMensajes);

    })


    nuevaTablaProductos.getAll().then(saraz => {
                
        listaProductos = Object.values(JSON.parse(JSON.stringify(saraz)));

        io.sockets.emit('productos', listaProductos);
        
    })


    //Agregar Nuevo mensaje
    socket.on('new-message',data => {

        nuevaTablaMensajes.save([data])

        nuevaTablaMensajes.getAll().then(saraz => {
                
            listaMensajes = Object.values(JSON.parse(JSON.stringify(saraz)));
            io.sockets.emit('messages', listaMensajes);
            
        })

    })
    // -----------------------------------------------------------------------

    //Agregar Nuevo producto
    socket.on('new-productos',data => {
        
        nuevaTablaProductos.save([data])

        nuevaTablaProductos.getAll().then(saraz => {
                
            listaProductos = Object.values(JSON.parse(JSON.stringify(saraz)));
            io.sockets.emit('productos', listaProductos);
            
        })


    });
   

    app.get("/prueba", (req, res) => {

        // ASYNC MENSAJES -----------------------------------------------------------------------
        
        /* nuevaTablaMensajes.getAll().then(saraz => {
                
            listaMensajes = Object.values(JSON.parse(JSON.stringify(saraz)));

            io.sockets.emit('mensajes', listaMensajes);

        })


        // ASYNC PRODUCTOS ------------------------------------------------------
        
        nuevaTablaProductos.getAll().then(saraz => {
                
            listaProductos = Object.values(JSON.parse(JSON.stringify(saraz)));

            io.sockets.emit('productos', listaProductos);
            
        }) */


        res.render("index.ejs", {productos: listaProductos, mensajes: listaMensajes})
    })

    

});