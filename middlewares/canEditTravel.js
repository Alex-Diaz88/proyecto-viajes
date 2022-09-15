const getDB = require('../db/getDB');
const { generateError } = require('../helpers');

const canEditTravel = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idTravel } = req.params;

        const idReqUser = req.userAuth.id;

        const [user] = await connection.query(
            `select * from travel where id = ? and idUser = ?`,
            [idTravel, idReqUser]
        );

        if (user.length < 1) {
            throw generateError(
                'No eres el propietario de la experiencia a editar',
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

module.exports = canEditTravel;
