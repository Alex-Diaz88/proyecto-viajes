const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const editUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const idReqUser = req.userAuth.id;

        const { username, email } = req.body;

        if (!(username || email)) {
            throw generateError('No has modificado ningún campo', 400);
        }

        const [user] = await connection.query(
            `select username, email from user where id = ?`,
            [idReqUser]
        );

        await connection.query(
            `update user set username = ?, email = ? where id = ?`,
            [username || user[0].username, email || user[0].email, idReqUser]
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
