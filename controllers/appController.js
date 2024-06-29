import { Categoria,Precio} from '../models/index.js'

//estas acciones seran para la vista publica o vita general

const inicio =async (req,res)=>{

    //hacemos una consulta de las categorias y precios
    const [categorias,precios] = await Promise.all([
        Categoria.findAll({raw:true}),
        Precio.findAll({raw:true})
    ])

    res.render('inicio',{
        pagina:'Inicio',
        categorias,
        precios
    })
}

const categoria = (req,res) =>{

}

const noEncontrado = (req,res)=>{

}
const buscador = (req,res)=>{

}
export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}