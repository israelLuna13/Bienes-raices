import express from "express"
import { formularioLogin, formularioRegistro , formularioPasswordOlvidado,registrar} from "../controllers/usuarioController.js"

const router = express.Router()
//rutas
router.get('/login',formularioLogin);
router.get('/registro',formularioRegistro);
router.post('/registro',registrar);
router.get('/recuperar-password',formularioPasswordOlvidado);
export default router
