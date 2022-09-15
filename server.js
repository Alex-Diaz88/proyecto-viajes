require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const app = express();

app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());

// ## MIDDLEWARES ##
const isAuth = require('./middlewares/isAuth');
const canEditUser = require('./middlewares/canEditUser');
const canEditTravel = require('./middlewares/canEditTravel');

// ## CONTROLADORES USUARIOS ##
const {
    newUser,
    loginUser,
    getUser,
    editUser,
    editUserPassword,
    editUserAvatar,
    deleteUser,
} = require('./controllers/users');

// ## CONTROLADORES VIAJES ##
const {
    newTravel,
    editTravel,
    deleteTravel,
} = require('./controllers/travels');

// ## CONTROLADORES COMENTARIOS ##
const newComment = require('./controllers/comments');

// ## ENDPOINTS DE USUARIOS ##
app.post('/register', newUser);
app.post('/login', loginUser);
app.get('/users/:idUser', getUser);
app.put('/users/:idUser', isAuth, canEditUser, editUser);
app.put('/users/:idUser/password', isAuth, canEditUser, editUserPassword);
app.put('/users/:idUser/avatar', isAuth, canEditUser, editUserAvatar);
app.delete('/users/:idUser', isAuth, canEditUser, deleteUser);

// ## ENDPOINTS VIAJES ##
app.post('/travels/new', isAuth, newTravel);
app.put('/travels/:idTravel', isAuth, canEditTravel, editTravel);
app.delete('/travels/:idTravel', isAuth, canEditTravel, deleteTravel);

// ## ENDPOINTS COMENTARIOS ##
app.post('/comments/:idTravel', isAuth, newComment);

// ## ENDPOINTS DE ERROR ##
app.use((req, res) => {
    res.status(404).send({
        status: 'Error',
        message: 'Not found',
    });
});

app.use((error, req, res, next) => {
    console.error(error);

    res.status(error.httpStatus || 500).send({
        status: 'Error',
        message: error.message,
    });
});

app.listen(3000, () => {
    console.log('Server listening at: localhost://3000');
});
