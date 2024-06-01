const {
    createUser,
    createExercice,
    getUsernameById,
    getAllUsers,
    getExercisesByUserId
} = require('./model.js');

const getUsers = async (req, res) => {
    const users = await getAllUsers();
    if (users) {
        // Hay usuarios en la base de datos
        // Devolvemos la lista de usuarios al cliente
        res.status(200).json(users);
    } else {
        // No hay usuarios en la base de datos
        // Devolvemos un mensaje de error al cliente
        res.status(404).json({ message: 'No users found' });
    }
}
const postUser = async (req, res) => {
    const { username } = req.body;
    console.log(req.body);
    if (!username) {
        // Falta el campo username en los datos de entrada
        // Devolvemos un mensaje de error al cliente
        res.status(400).json({ message: 'Missing username field' });
        return;
    }

    console.log('username: ', username);
    const user = await createUser(username);

    if (user) {
        // El usuario fue creado exitosamente
        // Devolvemos el usuario al cliente
        res.status(200).json(user);
    } else {
        // Ocurrió un error al crear el usuario
        // Devolvemos un mensaje de error al cliente
        res.status(404).json({ message: 'Error creating user' });
    }
}
const postExercice = async (req, res) => {
    const userId = req.body[':_id'];
    const exerciceName = req.body['description'];
    const duration = req.body['duration'];
    const date = req.body['date'];
    const username = await getUsernameById(userId);
    //const { userId:, exerciceName: description , duration, date } = req.body;
    console.log(req.body, ' userId: ', userId, ' exerciceName: ', exerciceName, ' duration: ', duration, ' date: ', date);
    if (!username || !userId || !exerciceName || !duration || !date) {

        // Falta alguno de los campos en los datos de entrada
        // Devolvemos un mensaje de error al cliente
        res.status(400).json({ message: 'Missing fields' });
        return;
    }
    const exercice = await createExercice(userId, exerciceName, duration, date);
    if (exercice) {
        // El ejercicio fue creado exitosamente
        // Devolvemos el ejercicio al cliente
        //buscamos el nombre del usuario
        
        const dateString = new Date(date).toDateString();
        res.status(200).json({
            _id: userId,
            username: username,
            date: dateString,
            duration: parseInt(duration),
            description: exerciceName
        });
    } else {
        // Ocurrió un error al crear el ejercicio
        // Devolvemos un mensaje de error al cliente
        res.status(404).json({ message: 'Error creating exercice' });
    }

}
const getExercicesByUserId = (req, res) => {
    const { userId } = req.params;
}

module.exports = {
    getUsers,
    postUser,
    postExercice,
    getExercicesByUserId
}

