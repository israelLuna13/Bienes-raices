import {DataTypes} from 'sequelize'
import db from '../config/dba.js'
import bcrypt from 'bcrypt'
const Usuario = db.define('usuarios',{
    nombre:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    token:DataTypes.STRING,

    confirmado:DataTypes.BOOLEAN
},
{    //antes de que se guarde en la base de datos, encriptamos la contraseña del usuario
    hooks:{
        beforeCreate:async function(usuario){
            const salt = await bcrypt.genSalt(10)
            usuario.password = await bcrypt.hash(usuario.password,salt); 
        }
    }
}
);
export default Usuario
