import {validationResult}from 'express-validator'
import {Precio,Categoria,Propiedad} from '../models/index.js'
const admin = async(req,res)=>{
    const {id} = req.usuario
    const propiedades = await Propiedad.findAll({
        where:{
            usuarioId:id
        },
        //relacionamos Propiedad con categoria y propiedad con precio
        include:[
            {model:Categoria,as: 'categoria' },
            {model:Precio, as:'precio'}
        ]
    })
    res.render('propiedades/admin',{
        pagina:'Mis propiedades',
        propiedades
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
    //tomamos el usuario que esta en req (se lo asignamos a req en el middleware)
    const {id:usuarioId} = req.usuario
    
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
            categoriaId,
            usuarioId,
            imagen:''
        })
        //redireccionamos
        const {id} = propiedadGuardada
        res.redirect(`/propiedades/agregar-imagen/${id}`)
        
    } catch (error) {
        console.log(error);
    }
}

const agregarImagen = async(req,res)=>{

    //validar que la propiedad exista
    const {id} = req.params
    const propiedad = await Propiedad.findByPk(id)
    //si no existe
    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    //validar que la propiedad no este publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades')
    }

    //validar que la propiedad pertenece a quien visita esta pagina
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades')
    }
    res.render('propiedades/agregar-imagen',{
        pagina:`Agregar imagen: ${propiedad.titulo}`,
        csrfToken:req.csrfToken(),
        propiedad
}
)}

const almacenarImagen=async(req,res,next)=>{
    //validar que la propiedad exista
    const {id} = req.params
    const propiedad = await Propiedad.findByPk(id)
    //si no existe
    if(!propiedad){
        return res.redirect('/mis-propiedades')
    }

    //validar que la propiedad no este publicada
    if(propiedad.publicado){
        return res.redirect('/mis-propiedades')
    }

    //validar que la propiedad pertenece a quien visita esta pagina
    if(req.usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect('/mis-propiedades')
    }

    try {

        //multer poen la informacion en file
        //almacenar la imagen y publicar propiedad
         propiedad.imagen = req.file.filename 
         propiedad.publicado = true
         await propiedad.save()//guardamos los cambios

         //redireccionamos en js desde agregarImagen.js
         
         //redireccionamos al siguiente middleware
         next()
        
    } catch (error) {
        console.log(error)
    }

}
export{
    admin,
    crear,
    guardar,
    agregarImagen,
    almacenarImagen
}