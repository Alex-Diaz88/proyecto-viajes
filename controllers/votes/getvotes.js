const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');

const getVotes = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idExperience } = req.params;

        const [[voteTravel]] = await connection.query(
            `
        select voted from vote where idTravel = ?`,
            [idExperience]
        );

        /*         if (!voteTravel) {
            throw generateError('No hay votos registrados', 500);
        }
 */
        res.send({
            status: 'Ok',
            data: [voteTravel],
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = getVotes;
