const getDB = require('../../db/getDB');
const { deletePhoto } = require('../../helpers');

const deleteTravel = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { idTravel } = req.params;

        const [photos] = await connection.query(
            `select name from travel_photo where idTravel = ?`,
            [idTravel]
        );

        for (let i = 0; i < photos.length; i++)
            await deletePhoto(photos[i].name, 1);

        await connection.query(`delete from travel_photo where idTravel = ?`, [
            idTravel,
        ]);

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
