const getDB = require('../../db/getDB');
const { generateError, savePhoto } = require('../../helpers');

const addTravelPhoto = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idTravel } = req.params;

        const [photos] = await connection.query(
            `select * from travel_photo where idTravel =?`,
            [idTravel]
        );

        if (photos.length >= 5) {
            throw generateError(
                'El viaje ya consta con 5 o más fotos, no se permiten más',
                409
            );
        }

        if (!req.files || !req.files.travelPhoto) {
            throw generateError('No has indicado una foto a subir', 400);
        }

        const photoName = await savePhoto(req.files.travelPhoto, 1);

        await connection.query(
            `insert into travel_photo (name, idTravel) values (?,?)`,
            [photoName, idTravel]
        );

        res.send({
            status: 'Ok',
            message: 'Foto insertada con éxito',
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = addTravelPhoto;
