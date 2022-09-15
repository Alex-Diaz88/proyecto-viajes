const getDB = require('../../db/getDB');

const deleteTravel = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { idTravel } = req.params;

        await connection.query(`delete from travel where id = ?`, [idTravel]);

        res.send({
            status: 'Ok',
            message: `El viaje con id ${idTravel} ha sido eliminado con éxito`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteTravel;
