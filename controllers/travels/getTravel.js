const getDB = require('../../db/getDB');

const getExperiences = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { search, order, direction } = req.query;

        const validOrderOptions = ['title', 'createdAt'];

        const validDirectionOptions = ['DESC', 'ASC'];

        const orderBy = validOrderOptions.includes(order) ? order : 'createdAt';

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'ASC';

        let travels;

        if (search) {
            [travels] = await connection.query(
                `select * from travel where title like ? or entry like ? or content like ? order by ${orderBy} ${orderDirection}`,
                [`%${search}%`, `%${search}%`]
            );
        } else {
            [travels] = await connection.query(
                `select * from travel order by ${orderBy} ${orderDirection}`
            );
        }

        const data = [];

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

module.exports = getExperiences;
