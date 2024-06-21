import categorias from "./categoria.js";
import db from '../config/dba.js'
import precios from "./precio.js";
import {Categoria,Precio} from '../models/index.js'

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

const eliminarDatos = async() => {
    try{
        //eliminamos los datos con destroy 
        //reiniciamos el contador de id con truncate
        // await Promise.all([
        //     Categoria.destroy({where:{},truncate:true}),
        //     Precio.destroy({where:{},truncate:true})
        // ]);
        await db.sync({force:true});
        console.log('Datos eliminados correctamente');
        process.exit();

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

    if(process.argv[2] === "-e"){
        eliminarDatos();
    }

