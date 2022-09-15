const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getUser = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idUser } = req.params;

        const [[user]] = await connection.query(
            `select * from user where id = ?`,
            [idUser]
        );

        if (!user) {
            throw generateError('No existe el usuario seleccionado', 404);
        }

        const [userTravels] = await connection.query(
            `select * from user where id = ?`,
            [idUser]
        );

        for (let i = 0; i < userTravels.length; i++) {
            const [travel] = await connection.query(
                `select id, title, entry, content from travel where id = ?`,
                [userTravels[i].id]
            );

            userTravels[i].travel = travel;
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
