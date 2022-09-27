const getDB = require('../../db/getDB');
const { generateError, deletePhoto, savePhoto } = require('../../helpers');
const { validate } = require('../../helpers');
const editUserSchema = require('../../schemas/editUserSchema');

const editUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id;

        const { username, email } = req.body;
        await validate(editUserSchema, req.body);

        const [user] = await connection.query(
            `select username, email, avatar from user where id = ?`,
            [idReqUser]
        );

        let avatarName;

        if (req.files?.avatar) {
            if (user[0].avatar) {
                await deletePhoto(user[0].avatar, 0);
            }
            avatarName = await savePhoto(req.files.avatar, 0);
        }

        await connection.query(
            `update user set username = ?, email = ?, avatar = ? where id = ?`,
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
            data: {
                username: username || user[0].username,
                email: email || user[0].email,
                avatar: avatarName || user[0].avatar,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editUser;
