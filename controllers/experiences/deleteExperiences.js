const getDB = require('../../db/getDB');
const deleteImage = require('../../helpers');

const deleteExperience = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { idExperience } = req.params;

        await connection.query(` DELETE FROM recomendaciones WHERE id = ?`, [
            idExperience,
        ]);
        res.send({
            status: 'Ok',
            message: `La experiencia con id ${idExperience} ha sido eliminado con éxito!`,
        });
        
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteExperience;
