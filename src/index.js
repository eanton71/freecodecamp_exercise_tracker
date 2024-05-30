const express = require('express');
const app = express();
const cors = require('cors');
//require('dotenv').config()
const  model = require('./model');
app.use(cors());
app.use(express.static('public'));




app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'views' });
});
/**
 * recibe el formulario de usuario desde la vista con username e _id, crea un usuariop
{
  "username": "eanton",
  "_id": "6655cf3af3f0350013ad1acd"
}
 */
app.post('/api/users', (req, res) => {
  res.json({ username: 'username', _id: '_id' });
});
/**
 * retorna la lista de usuarios
 
[...
  {
    "_id": "6655c705f3f0350013ad1ac2",
    "username": "james",
    "__v": 0
  },
  {
    "_id": "6655cf3af3f0350013ad1acd",
    "username": "eanton",
    "__v": 0
  }
]
 */
app.get('/api/users', (req, res) => {
  // la lista de auaurios estara en forma de array con elementos {username, _id}
  res.json({ username: 'username', _id: '_id' });
});



/**
 * recibe el formulario con: descripción, duración y, opcionalmente, fecha. Si no se indica ninguna fecha, se utilizará la fecha actual.
 * {
  "_id": "6655b818f3f0350013ad1aba",
  "username": "enriqueantonlopez",
  "date": "Thu Mar 03 2985",
  "duration": 43,
  "description": "35243"
}
 */
app.post('/api/users/:_id/exercises', (req, res) => {
  // La respuesta será el objeto usuario con los campos ejercicio añadidos.   
  res.json({ id: req.body._id, _id: '_id' });
});

/**
 * recuperar un registro completo de ejercicios de cualquier usuario
 * {
  "_id": "6655b818f3f0350013ad1aba",
  "username": "enriqueantonlopez",
  "count": 2,
  "log": [
    {
      "description": "35243",
      "duration": 43,
      "date": "Fri Feb 21 1986"
    },
    {
      "description": "35243",
      "duration": 54,
      "date": "Thu Feb 21 1985"
    }
  ]
}
 */
app.get('/api/users/:_id/logs', (req, res) => {
  // devuelve un objeto usuario con una propiedad count que representa el número de ejercicios que pertenecen a ese usuario.
  //devolverá el objeto usuario con un array de logs de todos los ejercicios añadidos.
  //Cada elemento de la matriz es un objeto que debe tener propiedades de descriptión: string, duratión:number y date:string (Date.dateString).
  //Puede añadir los parámetros from, to y limit a una solicitud GET /api/users/:_id/logs para recuperar parte del registro de cualquier usuario. from y to son fechas en formato aaaa-mm-dd. limit es un número entero que indica cuántos registros se deben devolver.
  res.json({ username: 'username', _id: '_id' });
});


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
