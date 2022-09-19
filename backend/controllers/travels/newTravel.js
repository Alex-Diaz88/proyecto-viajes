const getDB = require('../../db/getDB');
const { validate, generateError, savePhoto } = require('../../helpers');
const newTravelSchema = require('../../schemas/newTravelSchema');

const newTravel = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { title, entry, place, activity, content } = req.body;

        const travelPhotos = Array.isArray(req.files?.travelPhotos)
            ? req.files?.travelPhotos
            : [req.files?.travelPhotos];

        await validate(newTravelSchema, req.body);

        const idReqUser = req.userAuth.id;

        if (!travelPhotos) {
            throw generateError('No has indicado una foto a subir', 400);
        }

        if (travelPhotos.length > 5) {
            throw generateError(
                'El viaje solo puede tener 5 fotos, no se permiten más',
                409
            );
        }

        const photoNames = [];

        for (const photo of travelPhotos) {
            const photoName = await savePhoto(photo, 1);

            photoNames.push(photoName);
        }

        const [{ insertId }] = await connection.query(
            `insert into travel (title, entry, place, activity, content, createdAt, idUser)
            values (?, ?, ?, ?, ?, ?, ?)`,
            [title, entry, place, activity, content, new Date(), idReqUser]
        );

        for (const photoName of photoNames) {
            await connection.query(
                `insert into travel_photo (name, idTravel) values (?,?)`,
                [photoName, insertId]
            );
        }

        res.send({
            status: 'Ok',
            message: 'Viaje insertado con éxito',
            data: {
                id: insertId,
                title,
                entry,
                place,
                activity,
                content,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newTravel;
