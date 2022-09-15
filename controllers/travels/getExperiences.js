const getDB = require('../../db/getDB');

const getExperiences = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { search, order, direction } = req.query;

        const validOrderOptions = ['created_at'];

        const validDirectionOptions = ['desc', 'asc'];

        const orderBy = validOrderOptions.includes(order)
            ? order
            : 'created_at';

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'asc';

        let experiences;

        if (search) {
            [experiences] = await connection.query(
                `selects * from recomendaciones where name like ? or description like ? order by ${orderBy} ${orderDirection}`,
                [`%${search}%`, `%${search}%`]
            );
        } else {
            [experiences] = await connection.query(
                `select * from recomendaciones order by ${orderBy} ${orderDirection}`
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
