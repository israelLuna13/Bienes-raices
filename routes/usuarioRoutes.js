import express from "express"
import { formularioLogin, formularioRegistro , formularioPasswordOlvidado,registrar, confirmar, resetPassword,nuevoPassword,comprobarToken,autenticar, cerrarSesion} from "../controllers/usuarioController.js"

const router = express.Router()
//rutas
router.get('/login',formularioLogin);
router.post('/login',autenticar)

//cerrar sesion 
router.post('/cerrar-sesion', cerrarSesion)

router.get('/registro',formularioRegistro);
router.post('/registro',registrar);
router.get('/confirmar/:token',confirmar);
router.get('/recuperar-password',formularioPasswordOlvidado);
router.post('/recuperar-password',resetPassword);

//almacena el nuevo password
router.get('/recuperar-password/:token', comprobarToken)
router.post('/recuperar-password/:token', nuevoPassword)

export default router
