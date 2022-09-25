const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getTravel = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idTravel } = req.params;

        const [travel] = await connection.query(
            `select t.*,u.avatar, u.username, count (v.id) as votes from travel t left join vote v on t.id = v.idTravel inner join user u on t.idUser = u.id where t.id = ? group by t.id`,
            [idTravel]
        );

        if (travel.length < 1) {
            throw generateError('No existe el viaje seleccionado', 400);
        }

        for (let i = 0; i < travel.length; i++) {
            const [photos] = await connection.query(
                `select * from travel_photo where idTravel = ?`,
                [travel[i].id]
            );

            travel[i].photos = photos;
        }

        for (let i = 0; i < travel.length; i++) {
            const [comments] = await connection.query(
                `select * from comment where idTravel = ?`,
                [travel[i].id]
            );

            travel[i].comments = comments;
        }

        /*         for (let i = 0; i < travel.length; i++) {
            const [owner] = await connection.query(
                `select username, avatar from user where id = ?`,
                [travel[i].id]
            );

            travel[i].owner = owner;
        } */

        res.send({
            status: 'Ok',
            data: travel,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getTravel;
