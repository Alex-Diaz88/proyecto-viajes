const getDB = require('../../db/getDB');


const deleteComment = async (req, res, next) => {
    let connection;
    try {
        connection = await getDB();

        const { idComment } = req.params;

       

        await connection.query(`delete from comment where id = ?`, [idComment]);

        res.send({
            status: 'Ok',
            message: `El comentario con id ${idComment} ha sido eliminado con éxito`,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = deleteComment;
