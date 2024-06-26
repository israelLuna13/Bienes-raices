import {Dropzone} from 'dropzone'
//obtenemos el token que esta en la etiqueta meta y se lo pasamos a dropzone
const token =document.querySelector('meta[name="csrf-token"]').getAttribute("content")
//configuramos dropzone
// imagen es el id del formulario
Dropzone.options.imagen = {
    dictDefaultMessage:'Sube tus imagenes aqui', //modificamos el texto
    acceptedFiles:'.png,.jpg,.jpeg', // tipos de formato que acepta
    maxFilesize:5,//tamano del archivo
    maxFiles:1,//cantidad de archivos
    parallelUploads:1,//
    autoProcessQueue:false, // false -no se sube automaticamnete , true se sube automaticamente
    addRemoveLinks:true,//mostrar elnace para eliminar imagen
    dictRemoveFile:'Borrar archivo',//renombramos el mensaje
    dictMaxFilesExceeded:'El limite es 1 archivo',//renombramos el mensaje
    //este token lo necesita dropzone
    headers:{
        'CSRF-Token':token
    },
    //identificador que se utiliza en el controlador
    paramName:'imagen',

    //al no usar la subida automatica de dropzone , tenemos que hacerlo manual
    init:function(){
        const dropzone = this
        //tomamos el id del boton
        const btnpublicar = document.querySelector('#publicar')
        //cuando se lede click al boton mandamos llamar la funcion que hara la subida del archivo
        btnpublicar.addEventListener('click',function(){
            dropzone.processQueue()
        })

        //cuando se finalize el proceso de los archivos
        dropzone.on('queuecomplete',function(){
            //verificamos la cola de procesos de dropzone
            if(dropzone.getActiveFiles().length == 0){
                //redireccionamos con js
                window.location.href='/mis-propiedades'
            }
        })

    }
}