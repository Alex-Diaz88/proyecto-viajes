const getDB = require('../../db/getDB');

const newVote = async (req, res, next) => {
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
        let voted = false;

        if (vote) {
            await connection.query(
                `
    
    delete from vote where idTravel = ? and idUser = ?`,
                [idTravel, idReqUser]
            );
        } else {
            voted = true;
            await connection.query(
                `
    insert into vote (idTravel, idUser)
    values (?, ?)`,
                [idTravel, idReqUser]
            );
        }
        res.send({
            status: 'Ok',
            message: 'voto contabilizado con exito',
            data: {
                idUser: idReqUser,
                idTravel: idTravel,
                voted,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newVote;
