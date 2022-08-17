
class Contenedor{

    constructor (ObjOptions, nombreTabla)
    {
        
        if(nombreTabla == "productos")
        {
            this.ObjOptions = ObjOptions
            this.nombreTabla = nombreTabla

            const { options } = require(this.ObjOptions)
            this.knex = require("knex")(options)

            
            this.knex.schema.createTable(this.nombreTabla, table => {
                table.increments("id")
                table.string("title")
                table.string("price")
                table.string("thumbnail")
            })
                .then( () => console.log("Tabla Creada"))
                .catch((err) => { 
                    console.log("TABLA YA CREADA")
                    return
                    console.log(err); throw err

                })
                .finally(() => {
                    
                    this.knex.destroy(); 
                })

            
        } else if (nombreTabla == "mensajes") 
        {

            this.ObjOptions = ObjOptions
            this.nombreTabla = nombreTabla

            const { options } = require(this.ObjOptions)
            this.knex = require("knex")(options)

            this.knex.schema.createTable(this.nombreTabla, table => {
                table.increments("id")
                table.string("author")
                table.string("text")
                table.string("hora")
            })
                .then( () => console.log("Tabla Creada"))
                .catch((err) => { 
                    console.log("TABLA YA CREADA")
                    return
                    console.log(err); throw err

                })
                .finally(() => {this.knex.destroy(); 
                })


        }
        

    }


    async save(objeto){
        
        const { options } = require(this.ObjOptions)
        this.knex = require("knex")(options)

        this.knex(this.nombreTabla).insert(objeto)
        .then(()=>console.log("Dato Insertado"))
        .catch((err)=>{
            console.log(this.nombreTabla)
            console.log("PROBLEMA DE CONEXION AL SQL")
            
            console.log(err);
        })
        .finally(()=>{
            this.knex.destroy();
  });
        
    }
        
    async getById(num)
    {
        const { options } = require(this.ObjOptions)
        this.knex = require("knex")(options)

        this.knex.from(this.nombreTabla).select("id").where(num)
            .then((rows) => {

                result = Object.values(JSON.parse(JSON.stringify(rows)));
                console.log(result)

            })
            .catch((err) => { console.log(err); throw err })
            .finally(() => { this.knex.destroy();
            });

    }

    /* `${row["name"]} ${row["price"]} ${row["price"]}`  */

    async getAll()
    {
        const { options } = require(this.ObjOptions)
        this.knex = require("knex")(options)

        return this.knex.from(this.nombreTabla).select("*").then()
        /* .then((rows)=>{
    
            result = Object.values(JSON.parse(JSON.stringify(rows)));
            
            return result
            
  
        }) 
        .catch((err)=>{console.log(err);throw err})
        .finally(()=>{
            this.knex.destroy();
        
        }); */

        
        
        
        
        /* `${row['id']} ${row['name']} ${row['price']}` */

    }

    getAllSync()
    {
        
        
        
    }

    async deleteById(id)
    {
        
    }


    async deleteAll(){

        
    }

}


/* const nuevaTablaMensajes = new Contenedor("./options/mariaDB.js", "Mensajes")
const nuevaTablaDiamante = new Contenedor("./options/mariaDB.js", "Diamante")

module.exports = [nuevaTablaMensajes,nuevaTablaDiamante] */

module.exports = Contenedor