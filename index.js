import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
import db from './config/dba.js'
//crear la app
const app = express() 

//conexion a la base de datps 
try{
await db.authenticate();
console.log('Conexion Correcta a la base de datos')
}catch(error){
    console.log(error)

}
//habilitar pug
app.set('view engine','pug')
app.set('views','./views')

//Carpeta publica
app.use(express.static('public'));
//routing
app.use('/auth',usuarioRoutes)


//definir un puerto y arrancar el proyecto 
const port = 3000

app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el purto ${port}`)
})