(function(){

    //accedemos a los botones que tengas la clase cambiar-estado
    const cambiarEstadoBotones = document.querySelectorAll('.cambiar-estado')

    //accedemos el token que pusimos en el header para acceder a el y ponerlo en el fetch
    const token = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

    //a cada boton le ponemos un evento de click
    cambiarEstadoBotones.forEach(boton =>{
        boton.addEventListener('click', cambiarEstadoPropiedad)
    })

    //accedemos al id del atributo unico 'data-propiedad-id' con .dataset
    async function cambiarEstadoPropiedad(event){  
        const {propiedadId:id} = event.target.dataset

        //url dinamica , le pasamos como parametro el id del boton
        const url = `/propiedades/${id}`
        
        try {
            //hacemos una peticion a la url con el metodo post y el token para evitar ataques
            const respuesta = await fetch(url,{
                method:'PUT',
                headers:{
                    'CSRF-Token':token
                }
            })

            //la respuesta sera un booleano
            const {resultado} = await respuesta.json()

            //esta respuesta nos va a servir para cambiar las clases de un boton 
            //cambiamos el estado de una propiedad a publicada o no publicada
            if(resultado){
                //si es true
                // si el boton es amarillo 
                if(event.target.classList.contains('bg-yellow-100'))
                    {
                        //propiedad publicada
                        //quitamos el amarillo y le ponemos el verde
                        event.target.classList.add('bg-green-100','text-green-800')
                        event.target.classList.remove('bg-yellow-100','text-yellow-800')
                        //cambiamos el texto
                        event.target.textContent = 'Publicado'
                    }else{
                        //propiedad no publicada
                        //false 
                        //quitamos el verde y ponemos el amarillo
                        event.target.classList.remove('bg-green-100','text-green-800')
                        event.target.classList.add('bg-yellow-100','text-yellow-800')
                        event.target.textContent = 'No publicado'
                    }
            }

        } catch (error) {
            console.log(error);
        }
    }

})()