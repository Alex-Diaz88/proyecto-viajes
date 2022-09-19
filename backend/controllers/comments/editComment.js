const getDB = require('../../db/getDB');
const { generateError } = require('../../helpers');
const editCommentSchema = require('../../schemas//editCommentSchema');
const { validate } = require('../../helpers');

const editComment = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { idComment } = req.params;

        const { content } = req.body;

        await validate(editCommentSchema, req.body);

        if (!content) {
            throw generateError('No has escrito el commentario', 400);
        }

        const [comment] = await connection.query(
            `select * from comment where id = ?`,
            [idComment]
        );

        await connection.query(`update comment set content = ? where id = ?`, [
            content || comment[0].content,
            idComment,
        ]);

        res.send({
            status: 'Ok',
            message: `El comentario con id ${idComment} ha sido modificado con éxito`,
            data: { content },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = editComment;
