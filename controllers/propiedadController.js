import {validationResult}from 'express-validator'
import {Precio,Categoria,Propiedad} from '../models/index.js'
const admin = (req,res)=>{
    res.render('propiedades/admin',{
        pagina:'Mis propiedades',
        barra:true
    });
}

//formulario para crear una nueva propiedad
const crear = async(req,res)=>{
    //consultar modelo de precio y categorias
    const [categorias,precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
    ]);

    //se puede pasar directamente precios y categorias
    res.render('propiedades/crear',{
        pagina:'Crear Propiedad',
        barra:true,
        csrfToken:req.csrfToken(),
        categorias,
        precios,
        datos:{} // agregamos datos para que no marque error
    });
}

const guardar =async (req,res)=>{

    //validacion, aqui se guardaran los errores si es que hay
    //estos errores vienen del router 
    let resultado = validationResult(req)
    //si es diferente de vacio quiere decir que no hay errores
    if(!resultado.isEmpty()){
        //si hay error
    
        //consultar modelo de precio y categorias
     const [categorias,precios] = await Promise.all([
        Categoria.findAll(),
        Precio.findAll()
     ]);

        //se puede pasar directamente precios y categorias
      return   res.render('propiedades/crear',{
            pagina:'Crear Propiedad',
            barra:true,
            csrfToken:req.csrfToken(),
            categorias,
            precios,
            errores:resultado.array(),
            datos:req.body//esto sirve para mantener los datos en el form y no se pierdan
        });
    }


    //crear un registro
    //renombramos precio y categoria para que coincida con la base de datos
    const {titulo,descripcion,habitaciones,estacionamiento,wc,calle,lng,lat,precio:precioId,categoria:categoriaId} = req.body
    console.log(req.body);
    try {
        const propiedadGuardada = await Propiedad.create({
            titulo,
            descripcion,
            habitaciones,
            estacionamiento,
            wc,
            calle,
            lat,
            lng,
            precioId,
            categoriaId
        })
        
    } catch (error) {
        console.log(error);
    }
}
export{
    admin,
    crear,
    guardar
}