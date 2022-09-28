const getDB = require('../../db/getDB');

const getTravels = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { place, activity, order, direction } = req.query;

        const validOrderOptions = ['place', 'activity', 'votes'];

        const orderBy = validOrderOptions.includes(order) ? order : 'createdAt';

        let query = `SELECT t.*, u.username, u.avatar, count(v.id) as votes FROM travel t INNER JOIN user u ON t.idUser = u.id LEFT JOIN vote v ON t.id = v.idTravel`;

        let values = [];
        let clause = 'WHERE';

        if (place) {
            query += ` ${clause} place LIKE ?`;
            values.push(place);
            clause = 'AND';
        }

        if (activity) {
            query += ` ${clause} activity LIKE ?`;
            values.push(activity);
        }

        query += ` GROUP BY t.id ORDER BY ${orderBy} DESC`;

        const [travels] = await connection.query(query, values);

        for (let i = 0; i < travels.length; i++) {
            const [photos] = await connection.query(
                `SELECT * FROM travel_photo WHERE idTravel = ?`,
                [travels[i].id]
            );

            travels[i].photos = photos;
        }

        for (let i = 0; i < travels.length; i++) {
            const [comments] = await connection.query(
                `SELECT * FROM comment WHERE idTravel = ?`,
                [travels[i].id]
            );

            travels[i].comments = comments;
        }

        res.send({
            status: 'Ok',
            data: travels,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getTravels;
