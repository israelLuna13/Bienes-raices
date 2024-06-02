import {check,validationResult} from 'express-validator'
import Usuario from '../models/Usuario.js'
const formularioLogin = (req,res)=>{
    //va a renderizar lo que este en la carpeta auth 
    res.render('auth/login',{
       pagina: 'Iniciar Sesion'
    })
}

const formularioRegistro = (req,res)=>{
    res.render('auth/registro',{
        pagina:'Crear Cuenta'
    })
}

const formularioPasswordOlvidado = (req,res)=>{
    res.render('auth/recuperar-password',{
        pagina:'Recuperar password'
    })
}

const registrar = async(req,res)=>{
    //validamos los campos del formulario
    await check('nombre').notEmpty().withMessage('El nombre es obligatorio').run(req)
    await check('email').isEmail().withMessage('Escriba un email valido').run(req)
    await check('password').isLength({min:6}).withMessage('El password debe ser de al menos 6 caracteres').run(req)
    await check('repetir_password').equals(req.body.password).withMessage('El password no coincide').run(req)

    //resultado de la validacion de arriba
    let resultado = validationResult(req)

    //verificar que el resultado este vacio
    if(!resultado.isEmpty()){
        //errores
        return res.render('auth/registro',{
            pagina:'Crear Cuenta',
            errores:resultado.array(),
            usuario:{
                nombre:req.body.nombre,
                email:req.body.email
            }
        })
    }
    const usuario = await Usuario.create(req.body)
    res.json(usuario)
   
}
export {
        formularioLogin,
    formularioRegistro,
    formularioPasswordOlvidado,
    registrar
}