import bcrypt from 'bcrypt'
const usuarios = [
    {
        nombre:"Israel",
        email:"c24.e.israel.luna@gmail.com",
        confirmado:1,
        password: bcrypt.hashSync('password',10)
    },
    {
        nombre:"Dani",
        email:"dani@aldaco.com",
        confirmado:1,
        password: bcrypt.hashSync('password',10)
    }
]

export default usuarios;