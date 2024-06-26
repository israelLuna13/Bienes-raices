import nodemailer from 'nodemailer'
const emailRegistro = async(datos) => {

  //credenciales que nos da mailtrap
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    const {email,nombre,token} = datos;

    //enviar el email
    await transport.sendMail({
        from:'BienesRaices.com',
        to:email,
        subject:'Confirmar tu cuenta en BienesRaices.com',
        text:'Confirma tu cuenta en BienesRaices.com',
        html: `
                <p>Hola ${nombre},comprueba tu cuenta en bienesRaices.com</p>

                <p>Tu cuenta ya esta lista, solo debes confirmarla en el siguiente enlace:
                <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/confirmar/${token}">
                Confirmar Cuenta</a>
                </p>
                <p>Si tu no creaste esta cuenta, puedes ignorar el mensaje</p>
                `
    })
}


const emailOlvidePassword = async(datos) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

  const {email,nombre,token} = datos;

  //enviar el email
  await transport.sendMail({
      from:'BienesRaices.com',
      to:email,
      subject:'Restablecer password en BienesRaices.com',
      text:'Confirma tu cuenta en BienesRaices.com',
      html: `
              <p>Hola ${nombre},Has solicitidado restablecer tu password en bienesRaices.com</p>

              <p>Sigue el enlace para generar un nuevo password:
              <a href="${process.env.BACKEND_URL}:${process.env.PORT ?? 3000}/auth/recuperar-password/${token}">
              Restablecer password</a>
              </p>
              <p>Si tu no solicitaste este cambio, puedes ignorar el mensaje</p>
              `
  })
}


//enviar un correo cuando un usuario mande mensaje al vendedor
const emailMensaje = async(datos) => {
  const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

  const {email,nombre,titulo,vendedor,mensaje} = datos;

  //enviar el email
  await transport.sendMail({
      from:'BienesRaices.com',
      to:email,
      subject:'Informacion de una propiedad',
      text:`El usuario ${nombre} te ha enviado un mensaje acerca de la propiedad ${titulo}` ,
      html: `
              <p>Hola ${vendedor},tienes un nuevo mensaje acerca de un propiedad en bienesRaices.com</p>
              <p>${mensaje}</p>
              <p>Responde lo mas pronto posible</p>`
  })
}

export {
    emailRegistro,
    emailOlvidePassword,
    emailMensaje
    
}