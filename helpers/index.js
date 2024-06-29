
            //usuario autenticado   usuario que creo la propidead
const esVendedor = (usuarioId,propiedadUsuarioId)=>{
    //devolvemos true si el usuario que esta en sesion es el mismo que publico la propiedad
    return usuarioId === propiedadUsuarioId}

export {
    esVendedor
}