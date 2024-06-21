import Propiedad from './Propiedad.js'
import Precio from './Precio.js'
import Categoria from './Categoria.js'
import Usuario from './Usuario.js'

//relacionamos las tablas 1 a 1
//Precio.hasOne(Propiedad);
Propiedad.belongsTo(Precio , {foreignKey:'precioId'});
Propiedad.belongsTo(Categoria,{foreignKey:'categoriaId'});
Propiedad.belongsTo(Usuario,{foreignKey:'usuarioId'});
export {
    Propiedad,
    Precio,
    Categoria,
    Usuario
}