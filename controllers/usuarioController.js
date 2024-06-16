import { check, validationResult } from "express-validator";
import Usuario from "../models/Usuario.js";
import { generarId } from "../helpers/tokens.js";
import { emailRegistro } from "../helpers/emails.js";
import { where } from "sequelize";

const formularioLogin = (req, res) => {
  //va a renderizar lo que este en la carpeta auth
  res.render("auth/login", {
    pagina: "Iniciar Sesion",
  });
};

//protejemos la ruta de registro con CSRF
const formularioRegistro = (req, res) => {
  res.render("auth/registro", {
    pagina: "Crear Cuenta",
    csrfToken:req.csrfToken()
  });
};

const formularioPasswordOlvidado = (req, res) => {
  res.render("auth/recuperar-password", {
    pagina: "Recuperar password",
    csrfToken:req.csrfToken()
  });
};

const registrar = async (req, res) => {
  //validamos los campos del formulario
  await check("nombre")
    .notEmpty()
    .withMessage("El nombre es obligatorio")
    .run(req);
  await check("email")
    .isEmail()
    .withMessage("Escriba un email valido")
    .run(req);
  await check("password")
    .isLength({ min: 6 })
    .withMessage("El password debe ser de al menos 6 caracteres")
    .run(req);
  await check("repetir_password")
    .equals(req.body.password)
    .withMessage("El password no coincide")
    .run(req);

  //resultado de la validacion de arriba
  let resultado = validationResult(req);

  //verificamos que el resultado no este vacio
  if (!resultado.isEmpty()) {
    //errores
    return res.render("auth/registro", {
      pagina: "Crear Cuenta",
      csrfToken:req.csrfToken(),
      errores: resultado.array(),
      usuario: {
        nombre: req.body.nombre,
        email: req.body.email,
      
      },
    });
  }

  //extraer los datos
  const { email, nombre, password } = req.body;
  //verificar que el usuario no este duplicado
  const existeUsuario = await Usuario.findOne({ where: { email } });

    if (existeUsuario) {
      return res.render("auth/registro", {
        pagina: "Crear Cuenta",
        csrfToken:req.csrfToken(),
        errores: [{ msg: "El usuario ya esta registrado" }],
        usuario: {
          nombre: req.body.nombre,
          email: req.body.email,
        },
      });
    }

    //almacenar usuario
    const usuario = await Usuario.create({
      nombre,
      email,
      password,
      token: generarId(),
    });

  //enviar email de confirmacion
  emailRegistro({
    nombre: usuario.nombre,
    email: usuario.email,
    token: usuario.token,
  });

  res.render("template/mensaje", {
    pagina: "Cuenta Creada Correctamente",
    mensaje: "Hemos Enviado un Email de confirmacion, presiona en el enlace",
  });
};

//funcion que comprueba la cuenta
const confirmar = async(req,res) =>{
    const {token} = req.params
    //verificar si el token es valido
    const usuario =await Usuario.findOne({where:{token}})

    //si no se encuentra al usuario con ese token
    if(!usuario){
      //detenemos la ejecucion del codigo y mostramos la vista
      return res.render('auth/confirmar-cuenta',{
        pagina:'Error al confirmar tu cuenta',
        mensaje:'Hubo un errro al confirmar tu cuenta, intenta de nuevo',
        error:true
      })
    }

     //confirmar la cuenta

    //SI EL USUARIO SI ESTA EN LA BASE DE DATOS
    
    //modificamos el objeto usuario que obtuvimos 

    usuario.token = null // el token es de un solo uso
    usuario.confirmado = true //esto indica que el usuario confirmo su cuenta
    
    await usuario.save();

    res.render('auth/confirmar-cuenta',{
      pagina:'Cuenta confirmada',
      mensaje:'La cuenta se confirmo correctamente',
    })


}


const resetPassword = async(req,res)=>{
//validamos los campos del formulario

  await check("email")
  .isEmail()
  .withMessage("Escriba un email valido")
  .run(req);

  //resultado de la validacion de arriba
  let resultado = validationResult(req);

  //verificamos que el resultado no este vacio
  if (!resultado.isEmpty()) {
  //errores
  return res.render("auth/recuperar-password", {
    pagina: "Recupera el acceso a tu cuenta",
    csrfToken:req.csrfToken(),
    errores:resultado.array()
  });
  }

  //buscar el usuario

  const {email} = req.body
  const usuario = await Usuario.findOne({where:{email}})
  if(!usuario){
    res.render("auth/recuperar-password", {
      pagina: "Recupera el acceso a tu cuenta",
      csrfToken:req.csrfToken(),
      errores:[{msg:'El Email no pertenece a ningun usuario'}]
    });
  }

  //generar un token valido y enviar el email
  

}



export {
  formularioLogin,
  formularioRegistro,
  formularioPasswordOlvidado,
  registrar,
  confirmar,
  resetPassword
};

