import express from "express"  
import {body} from 'express-validator'
import protegerRuta from '../middleware/protegerRuta.js'
import { admin, crear,guardar,agregarImagen,almacenarImagen,editar } from "../controllers/propiedadController.js"
import upload from '../middleware/subirImagen.js'
const router = express.Router()

router.get('/mis-propiedades',protegerRuta,admin)
router.get('/propiedades/crear',protegerRuta,crear)
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
    ,guardar)

    router.get( '/propiedades/agregar-imagen/:id',protegerRuta,agregarImagen)
    router.post('/propiedades/agregar-imagen/:id',protegerRuta,upload.single('imagen'),almacenarImagen)
    router.get('/propiedades/editar/:id',protegerRuta,editar)

export default router