import {Dropzone} from 'dropzone'
//obtenemos el token que esta en la etiqueta meta y se lo pasamos a dropzone
const token =document.querySelector('meta[name="csrf-token"]').getAttribute("content")
//configuramos dropzone
Dropzone.options.imagen = {
    dictDefaultMessage:'Sube tus imagenes aqui',
    acceptedFiles:'.png,.jpg,.jpeg',
    maxFilesize:5,
    maxFiles:1,
    parallelUploads:1,
    autoProcessQueue:true,
    addRemoveLinks:true,
    dictRemoveFile:'Borrar archivo',
    dictMaxFilesExceeded:'El limite es 1 archivo',
    headers:{
        'CSRF-Token':token
    }
}