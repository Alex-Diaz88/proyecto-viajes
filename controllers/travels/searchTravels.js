const getDB = require('../../db/getDB');

const searchTravels = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const [travels] = await connection.query(
            `select t.*, count (v.id) as votes from travel t left join vote v on t.id = v.idTravel group by t.id`
        );

        for (let i = 0; i < travels.length; i++) {
            const [photos] = await connection.query(
                `select * from travel_photo where idTravel = ?`,
                [travels[i].id]
            );

            travels[i].photos = photos;
        }

        for (let i = 0; i < travels.length; i++) {
            const [comments] = await connection.query(
                `select * from comment where idTravel = ?`,
                [travels[i].id]
            );

            travels[i].comments = comments;
        }

        res.send({ status: 'ok', data: travels });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = searchTravels;
