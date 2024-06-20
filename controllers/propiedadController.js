import Precio from "../models/Precio.js";
import Categoria from "../models/Categoria.js";

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
        categorias,
        precios
    });
}
export{
    admin,
    crear
}