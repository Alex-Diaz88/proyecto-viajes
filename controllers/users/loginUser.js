const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateError, validate } = require('../../helpers');
require('dotenv').config();
const loginUserSchema = require('../../schemas/loginUserSchema');


const loginUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { email, password } = req.body;

        await validate(loginUserSchema, req.body);

        /*         if (!email) {
            throw generateError('Falta indicar el email', 400);
        }
        if (!password) {
            throw generateError('Falta indicar el password', 400);
        } */

        const [user] = await connection.query(
            `select id, email, password from user where email = ?`,
            [email]
        );
        console.log(user);

        if (user.length < 1) {
            throw generateError(
                'Ups! No existe un usuario registrado con ese email',
                404
            );
        }

        const validPassword = await bcrypt.compare(password, user[0].password);

        if (!validPassword) {
            throw generateError('Lo sentimos,la contraseña es incorrecta', 401); // Unauthorized
        }

        const tokenInfo = {
            id: user[0].id,
        };

        const token = jwt.sign(tokenInfo, process.env.SECRET, {
            expiresIn: '10d',
        });

        res.send({
            status: 'Ok',
            authToken: token,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = loginUser;
