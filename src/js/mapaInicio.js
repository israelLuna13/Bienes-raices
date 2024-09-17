
(function(){
    //tomamos las coordenadas que selecciono el usuario y si no selecciono nada ponemos las coord default
    const lat =  25.54389;
    const lng = -103.41898;

    // L.map('mapa'): Crea un mapa utilizando la biblioteca Leaflet. Se asume que hay un elemento HTML con el id mapa donde se va a renderizar el mapa.
    // .setView([lat, lng], 16): Establece la vista del mapa en las coordenadas especificadas (lat, lng) con un nivel de zoom de 16.
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 16);

    //grupo de markers
    let markers = new L.FeatureGroup().addTo(mapa)

    let propiedades=[]

  //filtros
  const filtro = {
    categoria:'',
    precio:''
  }

  //obtenemos el valor de los select atraves de su id
    const categoriasSelect = document.querySelector('#categorias')
    const preciosSelect = document.querySelector('#precios')

    //filtrado de categorias y precios

    //e.target.value siempre nos devolvera un string
    //agregamos el evento de change a los select
    //cada vez que cambie el select llenamos precio o categoria
    categoriasSelect.addEventListener('change',e=>{
      filtro.categoria = +e.target.value
      filtrarPropiedades()
    })

    preciosSelect.addEventListener('change',e=>{
      filtro.precio = +e.target.value
      filtrarPropiedades()
    })

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'): Crea una capa de tiles utilizando los mapas de OpenStreetMap. La URL de los tiles contiene {s}, {z}, {x}, y {y}, que son placeholders para el subdominio del servidor, el nivel de zoom, y las coordenadas del tile.
    // { attribution: ... }: Proporciona la atribución requerida por OpenStreetMap, que es un enlace al sitio web y a los derechos de autor.
    // .addTo(mapa): Añade esta capa de tiles al mapa creado anteriormente (mapa).
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades=async()=>{
      try{
        const url = '/api/propiedades' //url de nuestra api
        const respuesta = await fetch(url)//verficar si la conexion es correcta
        propiedades = await respuesta.json() //devolvemos la respuesta como json
        mostrarPropiedades(propiedades)
      }catch(error){
        console.log(error);
      }
    }

    const mostrarPropiedades = propiedades =>{

      //limpiar los markers previos para que no se soobrepongan 
      markers.clearLayers()
      //mostramos los pines en el mapa 
      propiedades.forEach(propiedad => {
        //agregamos los pines
        const marker = new L.marker([propiedad?.lat,propiedad?.lng],{
          autoPan:true,//centrar la vista
        })
        .addTo(mapa)
        .bindPopup(`
          <p class="text-indigo-600 font-bold">${propiedad.categoria.nombre}</p>
          <h1 class="text-xl font-extrabold uppercase my-5">${propiedad?.titulo}</h1>
          <img src="/uploads/${propiedad?.imagen}" alt="Imagen de la propiedad ${propiedad.titulo}">
          <p class="text-gray-600 font-bold">${propiedad.precio.nombre}</p>
          <a href="/propiedad/${propiedad.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase">Ver Propiedades</a>
          `)//cuando presione un pin me mostrara la informacion de la propiedad

          //agregamos los pines en el mapa
        markers.addLayer(marker)
        
      });
    }

    //obtenemos las propiedades que pertenecen a una categoria 
    const filtrarPropiedades = ()=>{
      const resultado = propiedades.filter(filtrarCategoria).filter(filtrarPrecio)
        mostrarPropiedades(resultado)
    }

    //obtenemos el id de las categrias que estan en una propiedad
    const filtrarCategoria =(propiedad)=>{
      return filtro.categoria ? propiedad.categoriaId === filtro.categoria: propiedad
    }

    const filtrarPrecio =(propiedad)=>{
      return filtro.precio ? propiedad.precioId === filtro.precio: propiedad
    }

    obtenerPropiedades()
})() //mandar llamar esta funcion