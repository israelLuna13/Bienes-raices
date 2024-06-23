import express from 'express'
import  csurf from 'csurf'
import cookieParser  from 'cookie-parser'
import usuarioRoutes from './routes/usuarioRoutes.js'
import propiedadesRoutes from './routes/propiedadesRoutes.js'
import db from './config/dba.js'

//crear la app
const app = express() 

//habilitar lectura de datos en formularios
// Configura body-parser
//middleware para procesar los datos de las solicitudes http
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//habilitamos cookieparser
//el token sera almacenara en los cookies
app.use(cookieParser())
//habilitar CSRF
app.use(csurf({cookie:true}))

//conexion a la base de datps 
try{
await db.authenticate();
db.sync()
console.log('Conexion Correcta a la base de datos')
}catch(error){
    console.log(error)

}
//habilitar pug
app.set('view engine','pug')
app.set('views','./views')

//Carpeta publica, esto permitira servir archivos estaticos como imagenes, CSS, JS
app.use(express.static('public'));
//routing
app.use('/auth',usuarioRoutes)
app.use('/',propiedadesRoutes)

//definir un puerto y arrancar el proyecto 

const port = process.env.PORT || 3000
app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el purto ${port}`)
})