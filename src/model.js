const Schema =  require('mongoose');

const mongoose= require('./mongoose.js').mongoose;

const userSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    username: String
}, {
    versionKey: false // You should be aware of the outcome after set to false
});
const User = mongoose.model('User', userSchema);
 
const exerciceSchema = new mongoose.Schema({
    _id: { type: Schema.Types.ObjectId, auto: true },
    description: String,
    duration: Number,
    date: Date,
    usuario: {
        type: Schema.Types.ObjectId, ref: 'User'
    }
}, {
    versionKey: false // You should be aware of the outcome after set to false
})
const Exercice = mongoose.model('Exercice', exerciceSchema);

async function createUser(username) {
    try {
        const user = new User({
            username
        });

        await user.save();

        console.log(`User created: ${user.username}`);

        return user;
    } catch (err) {
        console.log('Error creating user');
        console.error(err);
        return null;
    }
}
/**
 const username = 'johnDoe';
const user = await createUser(username);

if (user) {
  // El usuario fue creado exitosamente
  // Puedes utilizar el usuario para crear ejercicios
} else {
  // Ocurrió un error al crear el usuario
}
 */
async function createExercice(userId, description, duration, date) {
    try {
        const exercice = new Exercice({
            description,
            duration,
            date: new Date(date),
            usuario: userId
        });

        await exercice.save();

        console.log(`Exercice created for user ${userId}`);

        return exercice;
    } catch (err) {
        console.log('Error creating exercice');
        console.error(err);
        return null;
    }
}
/*
const userId = '123456789012345678901234';
const description = 'Running';
const duration = 30;
const date = '2023-03-22';
const exercice = await createExercice(userId, description, duration, date);

if (exercice) {
  // El ejercicio fue creado exitosamente
  // Puedes utilizar el ejercicio para actualizar el usuario
} else {
  // Ocurrió un error al crear el ejercicio
}
*/

async function getUsernameById(userId) {
    try {
        const user = await User.findById(userId);

        if (user) {
            console.log(`User found: ${user.username}`);
            return user.username;
        } else {
            console.log('User not found');
            return null;
        }
    } catch (err) {
        console.log('Error finding user');
        console.error(err);
        return null;
    }
}

/*
const userId = '123456789012345678901234';
const username = await getUsernameById(userId);

if (username) {
  // El usuario fue encontrado
  // Puedes utilizar el username para mostrarlo en la interfaz de usuario
} else {
  // El usuario no fue encontrado
}
*/
async function getAllUsers() {
    try {
        const users = await User.find();

        if (users) {
            console.log(`${users.length} users found`);
            return users;
        } else {
            console.log('No users found');
            return [];
        }
    } catch (err) {
        console.log('Error finding users');
        console.error(err);
        return [];
    }
}
/*
const users = await getAllUsers();

if (users.length > 0) {
  // Hay usuarios en la base de datos
  // Puedes utilizar la lista de usuarios para mostrarlos en la interfaz de usuario
} else {
  // No hay usuarios en la base de datos
}
*/

async function getExercisesByUserId(userId, startDate, endDate, limit) {
    try {
        const query = { usuario: userId };

        if (startDate) {
            query.date = { $gte: new Date(startDate) };
        }

        if (endDate) {
            if (query.date) {
                query.date.$lte = new Date(endDate);
            } else {
                query.date = { $lte: new Date(endDate) };
            }
        }

        const exercises = await Exercice.find(query).sort({ date: -1 }).limit(limit);

        if (exercises) {
            console.log(`${exercises.length} exercises found for user ${userId}`);
            return exercises;
        } else {
            console.log('No exercises found for user');
            return [];
        }
    } catch (err) {
        console.log('Error finding exercises');
        console.error(err);
        return [];
    }
}

/*
const userId = '123456789012345678901234';
const startDate = '2023-01-01';
const endDate = '2023-03-31';
const limit = 10;
const exercises = await getExercisesByUserId(userId, startDate, endDate, limit);

if (exercises.length > 0) {
  // Hay ejercicios en la base de datos
  // Puedes utilizar la lista de ejercicios para mostrarlos en la interfaz de usuario
} else {
  // No hay ejercicios en la base de datos
}

*/
/*
async function createUserAndExercices() {
    try {
        const user = new User({
            username: 'johnDoe'
        });

        await user.save();

        console.log(`User created: ${user.username}`);

        const exercice1 = new Exercice({
            description: 'Running',
            duration: 30,
            date: new Date(),
            usuario: user._id
        });
        const exercice2 = new Exercice({
            description: 'Swimming',
            duration: 45,
            date: new Date(),
            usuario: user._id
        });
        const exercice3 = new Exercice({
            description: 'Cycling',
            duration: 60,
            date: new Date(),
            usuario: user._id
        });

        const exercices = await Exercice.insertMany([exercice1, exercice2, exercice3]);

        console.log(`Exercices created: ${exercices.length}`);
    } catch (err) {
        console.log('Error creating user or exercices');
        console.error(err);
    }
}
setTimeout(() => {
    createUserAndExercices();
}, 2000);

*/

module.exports = {
    createUser,
    createExercice,
    getUsernameById,
    getAllUsers,
    getExercisesByUserId    //getTotalMinutesByUserId
};