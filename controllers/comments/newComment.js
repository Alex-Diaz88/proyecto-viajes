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
            `select * from travel where idTravel = ?;`,
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
            select * from comment where id = ?
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
