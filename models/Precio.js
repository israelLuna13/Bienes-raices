import db from '../config/dba.js'
import { DataTypes } from 'sequelize';

const Precio = db.define('precios',{
    
    nombre:{
        type:DataTypes.STRING(30),
        allowNull:false
    }

});

export default Precio;
