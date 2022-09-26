require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const fileUpload = require('express-fileupload');
const cors = require('cors');
const app = express();
const path = require('path');

app.use(express.json());
app.use(morgan('dev'));
app.use(fileUpload());
app.use(cors());
app.use(express.static(path.join(__dirname, 'static/')));

// ## MIDDLEWARES ##
const isAuth = require('./middlewares/isAuth');
const canEditUser = require('./middlewares/canEditUser');
const canEditTravel = require('./middlewares/canEditTravel');
const canEditComment = require('./middlewares/canEditComment');

// ## CONTROLADORES USUARIOS ##
const {
    newUser,
    loginUser,
    getUser,
    editUser,
    editUserPassword,
    deleteUser,
} = require('./controllers/users');

// ## CONTROLADORES VIAJES ##
const {
    newTravel,
    getTravel,
    searchTravels,
    editTravel,
    addTravelPhoto,
    deleteTravel,
} = require('./controllers/travels');
const getTravels = require('./controllers/travels/getTravels');

// ## CONTROLADORES DE VOTES ##
const { newVote } = require('./controllers/votes');

// ## CONTROLADORES COMENTARIOS ##
const {
    newComment,
    editComment,
    deleteComment,
} = require('./controllers/comments');

// ## ENDPOINTS DE USUARIOS ##
app.post('/register', newUser);
app.post('/login', loginUser);
app.get('/users/:idUser', getUser);
app.put('/users', isAuth, editUser);
app.put('/users/:idUser/password', isAuth, canEditUser, editUserPassword);
app.delete('/users/:idUser', isAuth, canEditUser, deleteUser);

// ## ENDPOINTS VIAJES ##

app.post('/travels/new', isAuth, newTravel);
app.get('/travels/:idTravel', getTravel);
/* app.get('/travels', searchTravels); */
app.get('/travels', getTravels);
app.put('/travels/:idTravel', isAuth, canEditTravel, editTravel);
app.put('/travels/:idTravel/photo', isAuth, canEditTravel, addTravelPhoto);
app.delete('/travels/:idTravel', isAuth, canEditTravel, deleteTravel);

// ## ENDPOINT VOTES ##
app.post('/votes/new/:idTravel', isAuth, newVote);

// ## ENDPOINTS COMENTARIOS ##
app.post('/comments/:idTravel', isAuth, newComment);
app.put('/comment/:idComment', isAuth, canEditComment, editComment);
app.delete('/comment/:idComment', isAuth, canEditComment, deleteComment);

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

app.listen(4000, () => {
    console.log('Server listening at: localhost://4000');
});
