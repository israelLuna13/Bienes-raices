import express from "express"  
import {body} from 'express-validator'
import protegerRuta from '../middleware/protegerRuta.js'
import identificarUsuario from "../middleware/identificarUsuario.js"
import { admin, crear,guardar,agregarImagen,almacenarImagen,editar,guardarCambios,eliminar,cambiarEstado,mostrarPropiedad,enviarMensaje, verMensajes,verPerfil ,editarPerfil,mostrarFormulario} from "../controllers/propiedadController.js"
import upload from '../middleware/subirImagen.js'
const router = express.Router()

router.get('/mis-propiedades',protegerRuta,admin) //vista para el admin
router.get('/propiedades/crear',protegerRuta,crear)//crear propiedad


//aqui mismo validamos los campos del formulario 
router.post('/propiedades/crear',protegerRuta,
    body('titulo').notEmpty().withMessage('El titulo del anuncio es Obligatorio'),
    body('descripcion').notEmpty().withMessage('La descripcion no puede ir vacia').
    isLength({max:200}).withMessage("La descripcion es muy larga"),
    body('categoria').isNumeric().withMessage('Selecciona una categoria'),
    body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
    body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
    body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
    body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
    body('lat').isNumeric().withMessage('Selecciona la Propiedad en el Mapa')
    ,guardar)//guardar una propiedad

    router.get( '/propiedades/agregar-imagen/:id',protegerRuta,agregarImagen)
    router.post('/propiedades/agregar-imagen/:id',protegerRuta,upload.single('imagen'),almacenarImagen)
    router.get('/propiedades/editar/:id',protegerRuta,editar)

    //editar una propiedad
    router.post('/propiedades/editar/:id',protegerRuta,
        body('titulo').notEmpty().withMessage('El titulo del anuncio es Obligatorio'),
        body('descripcion').notEmpty().withMessage('La descripcion no puede ir vacia').
        isLength({max:200}).withMessage("La descripcion es muy larga"),
        body('categoria').isNumeric().withMessage('Selecciona una categoria'),
        body('precio').isNumeric().withMessage('Selecciona un rango de precios'),
        body('habitaciones').isNumeric().withMessage('Selecciona la cantidad de habitaciones'),
        body('estacionamiento').isNumeric().withMessage('Selecciona la cantidad de estacionamientos'),
        body('wc').isNumeric().withMessage('Selecciona la cantidad de baños'),
        body('lat').isNumeric().withMessage('Selecciona la Propiedad en el Mapa')
        ,guardarCambios)

        //eliminar
        router.post('/propiedades/eliminar/:id',protegerRuta,eliminar )

        //con esta ruta cambiamos el estado de los botones
        //esta ruta sera usada por fetch
        router.put('/propiedades/:id',
            protegerRuta,
            cambiarEstado
        )

        //area publica - no necesita una cuenta
        router.get('/propiedad/:id',identificarUsuario
                                   ,mostrarPropiedad)

        //almacenar los mensajes enviados
        router.post('/propiedad/:id',
            identificarUsuario,
            body('mensaje').isLength({min:10}).withMessage('El mensaje no puede ir vacio o es muy corto') 
            ,enviarMensaje)

        //ver mensajes que tienen las propiedades    
        router.get('/mensajes/:id',
            protegerRuta,verMensajes
        ) 
        
        //ruta para el perfil del usuario
     
        router.get('/mi-perfil',
            protegerRuta,
            verPerfil)

        router.get('/editar-perfil',
            protegerRuta,
            mostrarFormulario
        )
        router.post('/editar-perfil',
            protegerRuta,
            editarPerfil
        )
   
export default router