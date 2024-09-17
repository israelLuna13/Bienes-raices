
            //usuario autenticado   usuario que creo la propidead
const esVendedor = (usuarioId,propiedadUsuarioId)=>{
    //devolvemos true si el usuario que esta en sesion es el mismo que publico la propiedad
    return usuarioId === propiedadUsuarioId}

const formatearFecha=fecha =>{

    //la fecha que se guarda en la bd la convertimos en string y tomamos los primeros 10 caracteres ****-**-**
    //en formato ISO 8601 ("YYYY-MM-DD")
    const nuevaFecha= new Date(fecha).toISOString().slice(0,10)

    //configuracion para formatear la fecha
    const opciones = {
        weekday:'long',
        year:'numeric',
        month:'long',
        day:'numeric'
    }

    //regresamos la fecha con un formato en espanol
    return new Date(nuevaFecha).toLocaleDateString('es-ES',opciones)
}
export {
    esVendedor,
    formatearFecha
}