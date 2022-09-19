const getDB = require('../../db/getDB');
const { generateError, deletePhoto } = require('../../helpers');
const bcrypt = require('bcrypt');
const deleteUserSchema = require('../../schemas/deleteUserSchema');
const { validate } = require('../../helpers');

const deleteUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idUser } = req.params;
        console.log(req.params);

        const { password } = req.body;

        await validate(deleteUserSchema, req.body);
        
/*         if (!password) {
            throw generateError(
                'Debes indicar la contraseña para eliminar al usuario',
                400
            );
        } */

        const [user] = await connection.query(
            `select password, avatar from user where id = ?`,
            [idUser]
        );

        const isValid = await bcrypt.compare(password, user[0].password);

        if (!isValid) {
            throw generateError(
                'lo sentimos, contraseña incorrecta, no se puede eliminar al usuario',
                401
            );
        }

        if (user[0].avatar) {
            await deletePhoto(user[0].avatar, 0);
        }

        const [photos] = await connection.query(
            `select name from travel_photo where idtravel = ?`,
            [idUser]
        );

        for (let i = 0; i < photos.length; i++)
            await deletePhoto(photos[i].name, 1);

        await connection.query(`delete from travel_photo where idTravel = ?`, [
            idUser,
        ]);
        await connection.query(`delete from travel where idUser = ?`, [idUser]);

        await connection.query(`delete from user where id = ?`, [idUser]);

        res.send({
            status: 'Ok',
            message: 'Usuario eliminado',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteUser;
