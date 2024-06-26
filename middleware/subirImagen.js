import multer from 'multer'
import path from 'path'
import {generarId} from '../helpers/tokens.js'


const storage = multer.diskStorage({
    //carpeta en donde guardamos loa archivos
    destination:function(req,file,cb){
        cb(null,'public/uploads/')
    },
    //generamos un id unico para el nuevo nombre de la imagen y le conctatenamos la extension original
    filename:function(req,file,cb){
        cb(null,generarId() + path.extname(file.originalname))
    }
})
//pasamos la configuracion a multer
const upload = multer({storage:storage})

export default upload