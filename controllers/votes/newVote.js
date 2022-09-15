const getDB = require('../../db/getDB');

const newVote = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { voted } = req.body;
        const { idTravel } = req.params;
        const idReqUser = req.userAuth.id;

        await connection.query(
            `          
            insert into vote (voted, idTravel, idUser)
            values (?, ?, ?)`,
            [voted, idTravel, idReqUser]
        );
        res.send({
            status: 'Ok',
            message: 'Voto contabilizado con exito',
            data: {
                voted: voted,
                idUser: idReqUser,
                idTravel: idTravel,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newVote;
