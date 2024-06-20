import categorias from "./categoria.js";
import Categoria from "../models/Categoria.js";
import db from '../config/dba.js'
import Precio from "../models/Precio.js";
import precios from "./precio.js";

const importarDatos= async ()=>{
    try{
        //Autenticar
        await db.authenticate()
        //generar las columnas
        await db.sync()
        //insertar los datos al mismo tiempo
        await Promise.all([
            Categoria.bulkCreate(categorias),
            Precio.bulkCreate(precios)
        ]);
        console.log('Datos Importados Correctamente');
        process.exit();// terminar los procesos pero no hubo errores 

    }catch(error){
        console.log(error);
        process.exit(1); // terminar los procesos pero hubo un error
    }
}
 //"db:importar":"node ./seed/seeder.js -i"
    //cuando mande llamar el script se ejecutara este codigo y se tomara el -i (es la posicion 2 del arreglo argv) para hacer la comparacion
    if(process.argv[2] === "-i"){
        importarDatos();
    }
