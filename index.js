import express from 'express'
import usuarioRoutes from './routes/usuarioRoutes.js'
//crear la app
const app = express() 
//habilitar pug
app.set('view engine','pug')
app.set('views','./views')
//routing
app.get('/login',usuarioRoutes)
app.get('/registro',usuarioRoutes)


//definir un puerto y arrancar el proyecto 
const port = 3000

app.listen(port,()=>{
    console.log(`El servidor esta funcionando en el purto ${port}`)
})