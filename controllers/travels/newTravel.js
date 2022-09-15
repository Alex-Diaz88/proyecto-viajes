const getDB = require('../../db/getDB');
const { generateError, validate } = require('../../helpers');
const newExperienceSchema = require('../../schemas/newTravelSchema');

const newTravel = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { title, entry, place, activity, content } = req.body;

        /*  await validate(newTravelSchema, req.body); */

        const idReqUser = req.userAuth.id;

        if (!title || !entry || !place || !activity || !content) {
            throw generateError('Debes indicar los campos obligatorios', 400);
        }

        const [{ insertId }] = await connection.query(
            `insert into travel (title, entry, place, activity, content, createdAt, idUser)
            values (?, ?, ?, ?, ?, ?, ?)`,
            [title, entry, place, activity, content, new Date(), idReqUser]
        );

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
