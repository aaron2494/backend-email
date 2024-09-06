const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());

app.post('/send-email', (req, res) => {
  const { nombre, email, telefono, asunto, mensaje } = req.body;

  // Configura el transporte con tus credenciales SMTP
  let transporter = nodemailer.createTransport({
    service: 'gmail', // o cualquier servicio de correo que uses
    auth: {
      user: "aaron.e.francolino@gmail.com", // Tu correo electrónico
      pass: "polc kwbp xojv frvd" // Tu contraseña de aplicación o cuenta
    }
  });

  // Configuración del correo
  let mailOptions = {
    from: email,
    replyTo: email, // // Correo del usuario que llenó el formulario
    to: 'agoosol.mar@gmail.com', // Correo de destino (empresa)
    subject: asunto,
    html: `
    <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; }
      h1 { color: #2c3e50; }
      footer { margin-top: 20px; font-size: 0.9em; color: #7f8c8d; }
      a { color: #3498db; }
    </style>
  </head>
  <body>
    <h1>Mensaje de ${nombre}</h1>
    <p><strong>Correo:</strong> ${email}</p>
    <p><strong>Teléfono:</strong> ${telefono}</p>
    <h2>Mensaje:</h2>
    <p>${mensaje}</p>
    <footer>
      <p>Enviado desde SalemTech</p>
      <p>Visita nuestro sitio web: <a href="https://main--salemtech.netlify.app/">www.salemtech.com</a></p>
    </footer>
  </body>
</html>
    `
  };

  // Enviar el correo
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error al enviar el correo:', error);
      return res.status(500).json({ message: 'Error al enviar el correo', error: error.toString() });
    }
    res.status(200).json({ message: 'Correo enviado correctamente' });
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
module.exports =app;