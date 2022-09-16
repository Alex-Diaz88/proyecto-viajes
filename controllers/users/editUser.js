const getDB = require('../../db/getDB');
const { generateError, deletePhoto, savePhoto } = require('../../helpers');

const editUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id;

        const { username, email } = req.body;

        if (!(username || email)) {
            throw generateError('No has modificado ningún campo', 400);
        }

        if (!req.files || !req.files.avatar) {
            throw generateError('Debes indicar un nuevo avatar', 400);
        }

        const [user] = await connection.query(
            `select username, email, avatar from user where id = ?`,
            [idReqUser]
        );

        if (user[0].avatar) {
            await deletePhoto(user[0].avatar, 0);
        }

        const avatarName = await savePhoto(req.files.avatar, 0);

        await connection.query(
            `update user set username = ?, email = ?, avatar = ?, where id = ?`,
            [
                username || user[0].username,
                email || user[0].email,
                avatarName || user[0].avatar,
                idReqUser,
            ]
        );

        res.send({
            status: 'Ok',
            message: 'Datos del usuario modificados con éxito',
            data: { username, email },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUser;
