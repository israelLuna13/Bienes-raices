import {Propiedad,Precio,Categoria} from '../models/index.js'

//esta accion servira para mostrar todas las propiedades en el mapa
const propiedades = async(req,res) =>{

    //consultamos todas las propiedades junto con categorias y precios
    const propiedades = await Propiedad.findAll({
        include:[
            {model:Precio, as:'precio'},
            {model:Categoria, as:'categoria'}
        ]
    })

    //mandamos la respuesta como json
    res.json(propiedades)
}

export {
    propiedades
}