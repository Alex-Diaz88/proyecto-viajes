const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const editExperience = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idExperience } = req.params;

        const { title, entry, text, place, stars } = req.body;

        if (!title || !text || !entry || !place || !stars) {
            throw generateError('No has modificado ningún campo.', 400);
        }

        const [recomendaciones] = await connection.query(
            `SELECT title, text, entry, place, stars FROM recomendaciones WHERE id = ?`,
            [idExperience]
        );

        await connection.query(
            `UPDATE recomendaciones 
             SET title = ?,
             text = ?,
             entry = ?,
             place = ?,
             stars = ?
             WHERE id = ?`,
            [
                title || recomendaciones[0].title,
                text || recomendaciones[0].text,
                entry || recomendaciones[0].entry,
                place || recomendaciones[0].place,
                stars || recomendaciones[0].stars,
                idExperience,
            ]
        );

        res.send({
            status: 'Ok',
            message: `La experencia con id ${idExperience} ha sido modificado con éxito!`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editExperience;
