import db from '../config/dba.js'

const Precio = db.define('precios',{
    
    nombre:{
        type:DataTypes.STRING(30),
        allowNull:false
    }

});

export default Precio;
