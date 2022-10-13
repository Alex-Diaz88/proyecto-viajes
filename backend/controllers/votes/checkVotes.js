const getDB = require('../../db/getDB');

const checkVotes = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { idTravel } = req.params;
        const idReqUser = req.userAuth.id;

        const [[vote]] = await connection.query(
            `
select * from vote where idTravel = ? and idUser = ?`,
            [idTravel, idReqUser]
        );

        res.send({
            status: 'Ok',
            message: 'voto contabilizado con exito',
            data: {
                idUser: idReqUser,
                idTravel: idTravel,
                voted: vote ? true : false,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = checkVotes;
