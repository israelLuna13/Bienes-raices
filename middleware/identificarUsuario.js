import jwt from 'jsonwebtoken'
import Usuario from '../models/Usuario.js'

const identificarUsuario = async(req,res,next)=>{

    //identificar si hay un token
    const {_token} = req.cookies

    //si no hay token ponemos al usuario como nulo
    if(!_token){
        req.usuario = null
        return next()
    }
    //comprobar el _token
    try {
        const decoded = jwt.verify(_token,process.env.JWT_SECRET); //decodificamos el token

        //de la consulta eliminamos datos sensibles con scope
        const usuario = await Usuario.scope('eliminarPassword').findByPk(decoded.id); //buscamos al usuario por id

        //si hay un usuario
        if(usuario){
            req.usuario = usuario
        }
        //nos vamos al siguiente middleware
        return next();
    } catch (error) {
        console.log(error);
        //limpiamos al cookie del token
        return res.clearCookie('_token').redirect('/auth/login')
    }
}

export default identificarUsuario