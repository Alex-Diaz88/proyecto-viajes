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

        const [travel] = await connection.query(
            `select * from travel where id = ?`,
            [idTravel]
        );

        if (travel.length < 1) {
            throw generateError(
                'No se puede eliminar un viaje que no existe...',
                400
            );
        }

        if (user.length < 1) {
            throw generateError(
                'No eres el propietario del viaje a editar',
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
