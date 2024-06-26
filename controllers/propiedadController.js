import { validationResult } from "express-validator";
import {
  Precio,
  Categoria,
  Propiedad,
  Mensaje,
  Usuario,
} from "../models/index.js";
import { unlink } from "node:fs/promises";
import { esVendedor, formatearFecha } from "../helpers/index.js";
import {emailMensaje} from '../helpers/emails.js'
const admin = async (req, res) => {
  //leer query string
  const { pagina: paginaActual } = req.query;

  //expresion regular
  const regex = /^[0-9]$/;
  //comprobamos si el query string cumple con la expresion regular
  if (!regex.test(paginaActual)) {
    return res.redirect("/mis-propiedades?pagina=1");
  }

  try {
    const { id } = req.usuario;

    //limites y offset para el paginador
    const limit = 5; //numero de propiedades por pagina
    const offset = paginaActual * limit - limit; // cantidad de paginas que se va a saltar
    const [propiedades, total] = await Promise.all([
      //buscamos todas las propiedades
      Propiedad.findAll({
        limit,
        offset,
        where: {
          usuarioId: id,
        },
        //relacionamos Propiedad con categoria , precio y con mensaje
        include: [
          { model: Categoria, as: "categoria" },
          { model: Precio, as: "precio" },
          { model: Mensaje, as: "mensajes" },
        ],
      }),
      //contamos las propiedades que publico el usuario
      Propiedad.count({
        where: {
          usuarioId: id,
        },
      }),
    ]);

    res.render("propiedades/admin", {
      pagina: "Mis propiedades",
      propiedades,
      csrfToken: req.csrfToken(),
      paginas: Math.ceil(total / limit),
      paginaActual: Number(paginaActual),
      offset,
      limit,
      total,
    });
  } catch (error) {
    console.log(error);
  }
};

//formulario para crear una nueva propiedad
const crear = async (req, res) => {
  //consultar modelo de precio y categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);

  //se puede pasar directamente precios y categorias
  res.render("propiedades/crear", {
    pagina: "Crear Propiedad",
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    datos: {}, // agregamos datos para que no marque error
  });
};

const guardar = async (req, res) => {
  //validacion, aqui se guardaran los errores si es que hay
  //estos errores vienen del router
  let resultado = validationResult(req);
  //si es diferente de vacio quiere decir que no hay errores
  if (!resultado.isEmpty()) {
    //si hay error

    //consultar modelo de precio y categorias
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);

    //se puede pasar directamente precios y categorias
    return res.render("propiedades/crear", {
      pagina: "Crear Propiedad",
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body, //esto sirve para mantener los datos en el form y no se pierdan
    });
  }

  //crear un registro
  //renombramos precio y categoria para que coincida con la base de datos
  const {
    titulo,
    descripcion,
    habitaciones,
    estacionamiento,
    wc,
    calle,
    lng,
    lat,
    precio: precioId,
    categoria: categoriaId,
  } = req.body;
  //tomamos el usuario que esta en req (se lo asignamos a req en el middleware)
  const { id: usuarioId } = req.usuario;

  try {
    const propiedadGuardada = await Propiedad.create({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId,
      categoriaId,
      usuarioId,
      imagen: "",
    });
    //redireccionamos
    const { id } = propiedadGuardada;
    res.redirect(`/propiedades/agregar-imagen/${id}`);
  } catch (error) {
    console.log(error);
  }
};

const agregarImagen = async (req, res) => {
  //validar que la propiedad exista
  const { id } = req.params;
  const propiedad = await Propiedad.findByPk(id);
  //si no existe
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }

  //validar que la propiedad pertenece a quien visita esta pagina
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }
  res.render("propiedades/agregar-imagen", {
    pagina: `Agregar imagen: ${propiedad.titulo}`,
    csrfToken: req.csrfToken(),
    propiedad,
  });
};

const almacenarImagen = async (req, res, next) => {
  //validar que la propiedad exista
  const { id } = req.params;
  const propiedad = await Propiedad.findByPk(id);
  //si no existe
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //validar que la propiedad no este publicada
  if (propiedad.publicado) {
    return res.redirect("/mis-propiedades");
  }

  //validar que la propiedad pertenece a quien visita esta pagina
  if (req.usuario.id.toString() !== propiedad.usuarioId.toString()) {
    return res.redirect("/mis-propiedades");
  }

  try {
    //multer poen la informacion en file
    //almacenar la imagen y publicar propiedad
    propiedad.imagen = req.file.filename;
    propiedad.publicado = true;
    await propiedad.save(); //guardamos los cambios

    //redireccionamos en js desde agregarImagen.js

    //redireccionamos al siguiente middleware
    next();
  } catch (error) {
    console.log(error);
  }
};

const editar = async (req, res) => {
  const { id } = req.params;

  //validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //revisar quien visita la url, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  //consultar modelo de precio y categorias
  const [categorias, precios] = await Promise.all([
    Categoria.findAll(),
    Precio.findAll(),
  ]);

  //se puede pasar directamente precios y categorias
  res.render("propiedades/editar", {
    pagina: `Editar propiedad ${propiedad.titulo}`,
    csrfToken: req.csrfToken(),
    categorias,
    precios,
    datos: propiedad, // agregamos datos para que no marque error
  });
};

const guardarCambios = async (req, res) => {
  //verificar la validacion
  //validacion, aqui se guardaran los errores si es que hay
  //estos errores vienen del router
  let resultado = validationResult(req);
  //si es diferente de vacio quiere decir que no hay errores
  if (!resultado.isEmpty()) {
    //si hay error

    //consultar modelo de precio y categorias
    const [categorias, precios] = await Promise.all([
      Categoria.findAll(),
      Precio.findAll(),
    ]);

    return res.render("propiedades/editar", {
      pagina: "Crear Propiedad",
      csrfToken: req.csrfToken(),
      categorias,
      precios,
      errores: resultado.array(),
      datos: req.body, //esto sirve para mantener los datos en el form y no se pierdan
    });
  }

  const { id } = req.params;

  //validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //revisar quie quien visita la url, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  //reescribir el objeto y actualizarlo

  try {
    //renombramos precio y categoria para que coincida con la base de datos
    const {
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lng,
      lat,
      precio: precioId,
      categoria: categoriaId,
    } = req.body;
    propiedad.set({
      titulo,
      descripcion,
      habitaciones,
      estacionamiento,
      wc,
      calle,
      lat,
      lng,
      precioId,
      categoriaId,
    });

    //guaradamos los cambios en el objeto
    await propiedad.save();
    //redireccionamos
    res.redirect("/mis-propiedades");
  } catch (error) {
    console.log(error);
  }
};
const eliminar = async (req, res) => {
  const { id } = req.params;

  //validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //revisar quie quien visita la url, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  //eliminar la imagen
  //tiene que existir la imagen , de lo contrario marcaria un error
  await unlink(`public/uploads/${propiedad.imagen}`);
  console.log(`se elimino la imagen ${propiedad.imagen}`);

  //Eliminar la propiedad
  await propiedad.destroy();
  res.redirect("/mis-propiedades");
};

//modifica el estado de la propiedad
const cambiarEstado =async (req,res) =>{
  const { id } = req.params;

  //validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id);

  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //revisar quie quien visita la url, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  //actualizar 
  // si es true lo pane false y si es false lo pone true
  propiedad.publicado = !propiedad.publicado
  await propiedad.save()

  //mandamos como json la respuesta a cambiarEstado.js para poder hacer validaciones
  res.json({
    resultado:'true'
  })
}

//muestra una propiedad
const mostrarPropiedad = async (req, res) => {
  const { id } = req.params;
  //validar que la propuedad exista
  const propiedad = await Propiedad.findByPk(id, {
    //relacionamos Propiedad con categoria y propiedad con precio
    include: [
      { model: Categoria, as: "categoria" },
      { model: Precio, as: "precio" },
    ],
  });

  //si no se encuentra la propiedad y no esta publicada
  if (!propiedad || !propiedad.publicado) {
    return res.redirect("/404");
  }
  res.render("propiedades/mostrar", {
    propiedad,
    pagina: propiedad.titulo,
    csrfToken: req.csrfToken(),
    usuario: req.usuario,
    esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
  });
};

const enviarMensaje = async (req, res) => {
  const { id } = req.params;
  //validar que la propuedad exista
  const propiedad = await Propiedad.findByPk(id, {
    //relacionamos Propiedad con categoria y propiedad con precio
    include: [
      { model: Categoria, as: "categoria" },
      { model: Precio, as: "precio" },
      { model: Usuario, as: "usuario" },
    ],
  });

  if (!propiedad) {
    return res.redirect("/404");
  }

  //renderizar los errores

  //validacion, aqui se guardaran los errores si es que hay

  //estos errores vienen del router
  let resultado = validationResult(req);
  //si es diferente de vacio quiere decir que no hay errores
  if (!resultado.isEmpty()) {
    //si hay error
    return res.render("propiedades/mostrar", {
      propiedad,
      pagina: propiedad.titulo,
      csrfToken: req.csrfToken(),
      usuario: req.usuario,
      esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
      errores: resultado.array(),
    });
  }


 
  //obtenemos los datos para crear el mensaje
  const { mensaje } = req.body;
  const { id: propiedadId } = req.params;
  const { id: usuarioId } = req.usuario;

  //almacenar el mensaje
  await Mensaje.create({
    mensaje,
    propiedadId,
    usuarioId,
  });

  const  {titulo}=propiedad;
 const  {nombre:vendedor}=propiedad.usuario;
 const  {nombre}=req.usuario;
 const {email}=req.usuario;
  //enviamos el correo al vendedor
  emailMensaje({
    email,
    nombre,
    titulo,
    vendedor,
    mensaje
  })


  //si se deja este codigo , se va a estar enviando el mismo mensaje cuando se vuelva a carga esta vista
  // return res.render("propiedades/mostrar", {
  //   propiedad,
  //   pagina: propiedad.titulo,
  //   csrfToken: req.csrfToken(),
  //   usuario: req.usuario,
  //   esVendedor: esVendedor(req.usuario?.id, propiedad.usuarioId),
  //   errores: resultado.array(),
  //   enviado:true
  // });

    //cuando se envie el mensaje redireccionamos al home
    res.redirect("/");
};

//leer mensajes recibidos
const verMensajes = async (req, res) => {
  const { id } = req.params;

  //validar que la propiedad exista
  const propiedad = await Propiedad.findByPk(id, {
    //incluimos el modelo de mensajes y tambien incluimos el usuario asociado a cada mensaje
    //de los datos del usuario eliminamos la contraseña
    include: [
      {
        model: Mensaje,
        as: "mensajes",
        include: [{ model: Usuario.scope("eliminarPassword"), as: "usuario" }],
      },
    ],
  });

  //si la propiedad no existe
  if (!propiedad) {
    return res.redirect("/mis-propiedades");
  }

  //revisar quie quien visita la url, es quien creo la propiedad
  if (propiedad.usuarioId.toString() !== req.usuario.id.toString()) {
    return res.redirect("/mis-propiedades");
  }

  res.render("propiedades/mensajes", {
    pagina: "Mensajes",
    mensajes: propiedad.mensajes,
    formatearFecha,
  });
};

export {
  admin,
  crear,
  guardar,
  agregarImagen,
  almacenarImagen,
  editar,
  guardarCambios,
  eliminar,
  cambiarEstado,
  mostrarPropiedad,
  enviarMensaje,
  verMensajes,
};
