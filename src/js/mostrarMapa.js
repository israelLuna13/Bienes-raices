(function(){
//accedemos a la informacon en el template de pug a traves del id
const lat = document.querySelector('#lat').textContent
const lng = document.querySelector('#lng').textContent
const calle = document.querySelector('#calle').textContent

const mapa = L.map('mapa').setView([lat,lng],16)

    // L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'): Crea una capa de tiles utilizando los mapas de OpenStreetMap. La URL de los tiles contiene {s}, {z}, {x}, y {y}, que son placeholders para el subdominio del servidor, el nivel de zoom, y las coordenadas del tile.
    // { attribution: ... }: Proporciona la atribución requerida por OpenStreetMap, que es un enlace al sitio web y a los derechos de autor.
    // .addTo(mapa): Añade esta capa de tiles al mapa creado anteriormente (mapa).
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //agregar el pin
    L.marker([lat,lng]).addTo(mapa).bindPopup(calle)

})()