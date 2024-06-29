import { Categoria,Precio,Propiedad} from '../models/index.js'

//estas acciones seran para la vista publica o vita general

const inicio =async (req,res)=>{

    //hacemos una consulta de las categorias y precios
    const [categorias,precios,casas,departamentos] = await Promise.all([
        Categoria.findAll({raw:true}),
        Precio.findAll({raw:true}),
        //buscamos  3 propiedades con la categoria 1
        Propiedad.findAll({
            limit:3,
            where:{
                categoriaId:1
            },
            include:[
                {
                    model:Precio,
                    as:'precio'
                }
            ],
            //ordenamos por fecha de creacion
            order:[['createdAt','DESC']]
        }),
        //buscamos 3 propiedades con la categoria 2
        Propiedad.findAll({
            limit:3,
            where:{
                categoriaId:2
            },
            include:[
                {
                    model:Precio,
                    as:'precio'
                }
            ],
            //ordenamos por fecha de creacion
            order:[['createdAt','DESC']]
        })
    ])

    res.render('inicio',{
        pagina:'Inicio',
        categorias,
        precios,
        casas,
        departamentos
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