import { Categoria,Precio,Propiedad} from '../models/index.js'
import {Sequelize} from 'sequelize'

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
        departamentos,
        csrfToken:req.csrfToken()
    })
}

const categoria = async(req,res) =>{

    const {id} = req.params

    //comprobar que la categoria exista
     const categoria = await Categoria.findByPk(id)

     //si la categoria no existe
     if(!categoria){
       return res.redirect('/404')
     }

    //obtener las propiedades de la categoria
    const propiedades = await Propiedad.findAll({
        where:{
            categoriaId:id
        },
        include:[{model:Precio, as:'precio'}]
    })

    res.render('categoria',{
        pagina:`${categoria.nombre}s en Venta`,
        propiedades,
        csrfToken:req.csrfToken()
    })
}

const noEncontrado = (req,res)=>{
    res.render('404',{
        pagina:'No encontrado',
        csrfToken:req.csrfToken()
    })
}

const buscador =async (req,res)=>{

    //obtenemos el termino de busqueda
    const {termino} = req.body

    //validar que termino no este vacio
    if(!termino.trim()){
        //nos lleva a la ruta anterior
        return res.redirect('back')
    }

    //consultar las propiedades
    const propiedades = await Propiedad.findAll({
        //buscamos todas las propiedades que coincidan con el titulo
        where:{
            //buscamos en todo el titulo si termino esta ahi 
            titulo:{
                [Sequelize.Op.like]: `%${termino}%`
            }
        },
        //en la busqueda incluimos el modelo de precios
        include:[
            {model:Precio, as:'precio'}
        ]
    })

    res.render('busqueda',{
        pagina:'Resultados de la Busqueda',
        propiedades,
        csrfToken:req.csrfToken()

    })
}
export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}