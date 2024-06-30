import Propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'
import Mensaje from './Mensaje.js';

//relacionamos las tablas 1 a 1
//Precio.hasOne(Propiedad);
Propiedad.belongsTo(Precio , {foreignKey:'precioId'});
Propiedad.belongsTo(Categoria,{foreignKey:'categoriaId'});
Propiedad.belongsTo(Usuario,{foreignKey:'usuarioId'});
//relacion 1:M , una propiedad puede tener muchos mensajes pero un mensaje solo tiene una propiedad
Propiedad.hasMany(Mensaje, { foreignKey: 'propiedadId', as: 'mensajes' });
//relacion 1:1 
//un mensaje pertenece a una propiedad y a un usuario
Mensaje.belongsTo(Propiedad,{foreignKey:'propiedadId'})
Mensaje.belongsTo(Usuario,{foreignKey:'usuarioId'})

export {
    Propiedad,
    Precio,
    Categoria,
    Usuario,
    Mensaje
}