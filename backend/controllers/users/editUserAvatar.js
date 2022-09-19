const getDB = require('../../db/getDB');
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const editUserAvatar = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idUser } = req.params;

        if (!req.files || !req.files.avatar) {
            throw generateError('Debes indicar un nuevo avatar', 400);
        }

        const [user] = await connection.query(
            `select avatar from user where id = ?`,
            [idUser]
        );

        if (user[0].avatar) {
            await deletePhoto(user[0].avatar, 0);
        }

        const avatarName = await savePhoto(req.files.avatar, 0);

        await connection.query('update user set avatar = ? where id = ?', [
            avatarName,
            idUser,
        ]);

        res.send({
            status: 'Ok',
            message: 'Avatar de usuario modificado con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUserAvatar;
