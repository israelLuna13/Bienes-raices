import express from 'express'
import {inicio,categoria,buscador,noEncontrado} from '../controllers/appController.js'
const router = express.Router()

//pagina de inicio

router.get('/',inicio)

//pagina categorias
router.get('/categorias/:id',categoria)

// pagina 404
router.get('/404',noEncontrado)
//buscador
router.post('/buscador',buscador)


export default router