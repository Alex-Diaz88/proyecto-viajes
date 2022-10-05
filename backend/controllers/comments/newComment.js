'use strict';

const getDB = require('../../db/getDB');
const { validate } = require('../../helpers');
const { newCommentSchema } = require('../../schemas/newCommentSchema');
let connection;
const newComment = async (req, res, next) => {
    try {
        connection = await getDB();
        const { idTravel } = req.params;
        const { content } = req.body;
        await validate(newCommentSchema, req.body);
        const [[travel]] = await connection.query(
            `select * from travel where id = ?;`,
            [idTravel]
        );
        if (!travel) {
            const error = new Error('El viaje a comentar no existe');
            error.httpStatus = 401;
            throw error;
        }
        const idReqUser = req.userAuth.id;

        const [{ insertId }] = await connection.query(
            `
            insert into comment (content, idUser, idTravel)
            values(?, ?, ?)
        `,
            [content, idReqUser, idTravel]
        );

        const [[createdComment]] = await connection.query(
            `
            select c.*, u.avatar, u.username from comment c inner join user u on c.idUser = u.id where c.id = ?
        `,
            [insertId]
        );

        res.status(200).send({
            status: 200,
            data: createdComment,
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newComment;
