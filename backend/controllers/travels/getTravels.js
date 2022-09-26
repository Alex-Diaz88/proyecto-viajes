const getDB = require('../../db/getDB');

const getTravels = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { search, order, direction } = req.query;

        const validOrderOptions = ['place', 'activity', 'votes'];

        const validDirectionOptions = ['DESC', 'ASC'];

        const orderBy = validOrderOptions.includes(order) ? order : 'createdAt';

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'DESC';

        let travels;

        if (search) {
            [travels] = await connection.query(
                `SELECT t.*, u.username, u.avatar FROM travel t 
                INNER JOIN user u ON t.idUser = u.id 
                WHERE place LIKE ? OR activity LIKE ?
                ORDER BY ${orderBy} ${orderDirection}`,
                [`%${search}%`, `%${search}%`]
            );
        } else {
            [travels] = await connection.query(
                `SELECT t.*, u.username, u.avatar FROM travel t 
                INNER JOIN user u ON t.idUser = u.id
                ORDER BY ${orderBy} ${orderDirection}`,
                [`%${search}%`, `%${search}%`]
            );
        }

        const data = [];

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
            data: data,
        });
        
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getTravels;
