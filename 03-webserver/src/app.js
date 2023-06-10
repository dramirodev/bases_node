const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();
// HBS
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));
hbs.registerPartials(path.join(__dirname, '/views/partials'));

require('dotenv').config();

const port = process.env.PORT;




// Servir contenido estático

app.use(express.static(__dirname + '/public'));


app.get('/', (req, res) => {
    res.render('home', {
      nombre: 'David Ramiro',
      titulo: 'Curso de Node'
    });
});
app.get('/generic', (req, res) => {
    res.render('generic')
});

app.get('/elements', (req, res) => {
  res.render('elements')
});
app.get('*', (req, res) => {
   res.sendFile(__dirname + '/public/404.html');
});

app.listen(port, () => {
    console.log('Escuchando peticiones en el puerto 8080');
});

