const getDB = require('../../db/getDB');
const bcrypt = require('bcrypt');
const { generateError } = require('../../helpers');
const {newUserSchema }= require('../../schemas/newUserSchema');
const { validate } = require('../../helpers');

const newUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { username, email, password } = req.body;
        await validate(newUserSchema, req.body);

        if (!username || !email || !password) {
            throw generateError('Faltan campos obligatorios', 400);
        }

        const [user] = await connection.query(
            `select id from user where email = ?`,
            [email]
        );

        if (user.length > 0) {
            throw generateError('Ya existe un usuario con ese email.', 409);
        }

        const [user2] = await connection.query(
            `select id from user where username = ?`,
            [username]
        );

        if (user2.length > 0) {
            throw generateError('Ya existe un usuario con ese nombre.', 409);
        }




        const hashedPassword = await bcrypt.hash(password, 10);

        await connection.query(
            `insert user (username, email, password, createdAt)
            values (?, ?, ?, ?)`,
            [username, email, hashedPassword, new Date()]
        );

        res.send({
            status: 'Ok',
            message: 'Usuario creado con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newUser;
