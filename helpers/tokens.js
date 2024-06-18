import jwt from 'jsonwebtoken'

//este token esta conformado por el id del usuario , y el nombre, tendra un dia de duracion
const generarJWT =datos =>
    jwt.sign({id:datos.id,nombre:datos.nombre},process.env.JWT_SECRET,{
    expiresIn:'1d'
  });

//generamos un id cuando un usuario se registre, ese id servira para que el usuario confirme su cuenta  
const generarId = () => Math.random().toString(32).substring(2) +  Date.now().toString(32) ;

export {
generarId,
generarJWT
}