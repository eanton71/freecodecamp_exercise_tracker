const {
    createUser,
    createExercice,
    getUsernameById,
    getAllUsers,
    getExercisesUserId
} = require('./model.js');

const getUsers = async (req, res) => {
    console.log('lista de usuarios');
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
    console.log('crear usuario');
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
    console.log(`crear ejercicio ${req.params._id}`);
    const userId = req.params._id;
    const exerciceName = req.body['description'];
    const duration = req.body['duration'];
    const date = req.body['date'];
    const username = await getUsernameById(userId);
    console.log('username: ', username);
    //const { userId:, exerciceName: description , duration, date } = req.body;
    console.log(req.body, ' userId: ', userId, ' exerciceName: ', exerciceName, ' duration: ', duration, ' date: ', date);
    if (!username || !userId || !exerciceName || !duration) {

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
const getExercicesByUserId = async (req, res) => {
    console.log('MongoDB, lista de ejercicios por usuario', req.params);
    const userId = req.params['_id'];
    const from = req.query.from;
    const to = req.query.to;
    const limit = req.query.limit;
    console.log(userId, from, to, limit);
    const list = await getExercisesUserId(userId, from, to, limit)
    if (list) {
        // Hay ejercicios en la base de datos
        // Devolvemos la lista de ejercicios al cliente
     
        const userExercices = {
            _id: userId,
            username: await getUsernameById(userId),
            count: list.length,
            log: list.map((a) => {
                return {
                    description: a.description,
                    duration: a.duration,
                    date: new Date(a.date).toDateString()
                };
            })  
        }
        console.log(list);
        console.log(userExercices);
        res.status(200).json(userExercices);
    } else {
        // No hay ejercicios en la base de datos
        // Devolvemos un mensaje de error al cliente
        res.status(404).json({ message: 'No exercises found' });
    }
}

module.exports = {
    getUsers,
    postUser,
    postExercice,
    getExercicesByUserId
}

