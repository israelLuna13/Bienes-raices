import express from 'express'
import identificarUsuario from "../middleware/identificarUsuario.js"
import {inicio,categoria,buscador,noEncontrado} from '../controllers/appController.js'
const router = express.Router()

//pagina de inicio

router.get('/',identificarUsuario,inicio)

//pagina categorias
router.get('/categorias/:id',identificarUsuario,categoria)

// pagina 404
router.get('/404',identificarUsuario,noEncontrado)
//buscador
router.post('/buscador',identificarUsuario,buscador)


export default router