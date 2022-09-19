const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idUser } = req.params;

        const [[user]] = await connection.query(
            `select id, username, avatar, createdAt from user where id = ?`,
            [idUser]
        );

        if (!user) {
            throw generateError('No existe el usuario seleccionado', 404);
        }

        const [userTravels] = await connection.query(
            `select * from travel where idUser = ?`,
            [idUser]
        );

        for (let i = 0; i < userTravels.length; i++) {
            const [photos] = await connection.query(
                `select * from travel_photo where idTravel = ?`,
                [userTravels[i].id]
            );

            userTravels[i].photos = photos;
        }

        res.send({
            status: 'Ok',
            data: { ...user, userTravels },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getUser;
