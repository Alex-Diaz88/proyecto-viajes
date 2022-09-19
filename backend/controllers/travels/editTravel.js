const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const editTravelSchema = require('../../schemas//editTravelSchema');
const { validate } = require('../../helpers');

const editTravel = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idTravel } = req.params;

        const { title, entry, content } = req.body;

        await validate(editTravelSchema, req.body);

        if (!title || !entry || !content) {
            throw generateError('No has modificado ningún campo', 400);
        }

        const [travel] = await connection.query(
            `select title, entry, content from travel where id = ?`,
            [idTravel]
        );

        await connection.query(
            `update travel set title = ?, entry = ?, content = ? where id = ?`,
            [
                title || travel[0].title,
                entry || travel[0].entry,
                content || travel[0].content,
                idTravel,
            ]
        );

        res.send({
            status: 'Ok',
            message: `El viaje con id ${idTravel} ha sido modificado con éxito`,
            data: { title, entry, content },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editTravel;
