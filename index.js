import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
//crear la app
const app = express() 
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