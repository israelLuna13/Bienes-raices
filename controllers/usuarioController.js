
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
export {
    formularioLogin,
    formularioRegistro,
    formularioPasswordOlvidado
}