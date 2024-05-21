
const formularioLogin = (req,res)=>{
    //va a renderizar lo que este en la carpeta auth 
    res.render('auth/login',{
        autenticado:false
    })
}

const formularioRegistro = (req,res)=>{
    res.render('auth/registro',{
        autenticado:false
    })
}
export {
    formularioLogin,
    formularioRegistro
}