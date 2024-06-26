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
    paramName:'imagen'
}