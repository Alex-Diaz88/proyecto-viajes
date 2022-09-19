const getDB = require('../db/getDB');
const { generateError } = require('../helpers');

const canEditComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idComment } = req.params;

        const idReqUser = req.userAuth.id;

        const [user] = await connection.query(
            `select * from comment where id = ? and idUser = ?`,
            [idComment, idReqUser]
        );

        if (user.length < 1) {
            throw generateError(
                'No eres el propietario del comentario a editar',
                401
            );
        }

        next();
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = canEditComment;
