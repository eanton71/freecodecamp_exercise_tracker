const express = require('express');
const cors = require('cors');

const {
  getUsers,
  postUser,
  postExercice,
  getExercicesByUserId
} = require('./controller.js');


const app = express();
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.get('/', (req, res) => {
  res.sendFile('index.html', { root: 'views' });
});
/**
 * recibe el formulario de usuario desde la vista con username e _id, crea un usuariop
 */
app.post('/api/users', postUser);


/**
 * retorna la lista de usuarios
  */
app.get('/api/users', getUsers);



/**
 * recibe el formulario con: descripción, duración y, opcionalmente, fecha. Si no se indica ninguna fecha, se utilizará la fecha actual.
  */
app.post('/api/users/:_id/exercises', postExercice);



/**
 * recuperar un registro completo de ejercicios de cualquier usuario
  // devuelve un objeto usuario con una propiedad count que representa el número de ejercicios que pertenecen a ese usuario.
  //devolverá el objeto usuario con un array de logs de todos los ejercicios añadidos.
  //Cada elemento de la matriz es un objeto que debe tener propiedades de descriptión: string, duratión:number y date:string (Date.dateString).
  //Puede añadir los parámetros from, to y limit a una solicitud GET /api/users/:_id/logs para recuperar parte del registro de cualquier usuario. from y to son fechas en formato aaaa-mm-dd. limit es un número entero que indica cuántos registros se deben devolver.

*/
app.get('/api/users/:_id/logs', getExercicesByUserId);
 


const listener = app.listen(process.env.PORT || 3000, () => {
  console.log('Your app is listening on port ' + listener.address().port)
})
