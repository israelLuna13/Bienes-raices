(function(){
    //tomamos las coordenadas que selecciono el usuario y si no selecciono nada ponemos las coord default
    const lat =  25.54389;
    const lng = -103.41898;

    // L.map('mapa'): Crea un mapa utilizando la biblioteca Leaflet. Se asume que hay un elemento HTML con el id mapa donde se va a renderizar el mapa.
    // .setView([lat, lng], 16): Establece la vista del mapa en las coordenadas especificadas (lat, lng) con un nivel de zoom de 16.
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 16);

    //grupo de markers
    let markers = new L.FeatureGroup().addTo(mapa)

      // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'): Crea una capa de tiles utilizando los mapas de OpenStreetMap. La URL de los tiles contiene {s}, {z}, {x}, y {y}, que son placeholders para el subdominio del servidor, el nivel de zoom, y las coordenadas del tile.
    // { attribution: ... }: Proporciona la atribución requerida por OpenStreetMap, que es un enlace al sitio web y a los derechos de autor.
    // .addTo(mapa): Añade esta capa de tiles al mapa creado anteriormente (mapa).
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    const obtenerPropiedades=async()=>{
      try{
        const url = '/api/propiedades'
        const respuesta = await fetch(url)//verficar si la conexion es correcta
        const propiedades = await respuesta.json() //devolvemos la respuesta como json
        mostrarPropiedades(propiedades)
      }catch(error){
        console.log(error);
      }
    }

    const mostrarPropiedades = propiedades =>{
      //mostramos los pines en el mapa 
      propiedades.forEach(propiedad => {
        //agregamos los pines
        const marker = new L.marker([propiedad?.lat,propiedad?.lng],{
          autoPan:true,//centrar la vista
        })
        .addTo(mapa)
        .bindPopup('Informacion aqui')//cuando presione un pin me mostrara un mensaje

        markers.addLayer(marker)
        
      });
    }

    obtenerPropiedades()

})()