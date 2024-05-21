import express from "express"
import { formularioLogin, formularioRegistro } from "../controllers/usuarioController.js"

const router = express.Router()
//rutas
router.get('/login',formularioLogin);
router.get('/registro',formularioRegistro);

export default router
