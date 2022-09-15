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
        const [comment] = await connection.query(
            `select idUser, content from comment where idTravel = ?;`,
            [idTravel]
        );

        const idReqUser = req.userAuth.id;

        if (!idReqUser /*  !== Number(comment[0].idUser) */) {
            const error = new Error(
                'Debes ser un usuario registrado para comentar un viaje'
            );
            error.httpStatus = 401;
            throw error;
        }

        await connection.query(
            `
            UPDATE comment
            SET comment.content = ?
            FROM comment
            INNER JOIN travel
            ON comment.idTravel = travel.id
            AND comment.idUser = travel.idUser
        `,
            [content]
        );

        res.status(200).send({
            status: 200,
            data: {
                idExp: comment[0].idTravel,
                idUser: comment[0].idUser,
                contentt: content,
            },
        });
    } catch (error) {
        next(error);
    } finally {
        if (connection) connection.release();
    }
};

module.exports = newComment;
