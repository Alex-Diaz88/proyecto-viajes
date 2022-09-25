const getDB = require('../../db/getDB');

const getTravels = async (req, res, next) => {
    let connection;

    try {
        connection = await getDB();

        const { search, order, direction } = req.query;

        const validOrderOptions = ['place', 'activity', 'votes'];

        // Array de opciones válidas para la direccion en la que se ordenan los campos
        const validDirectionOptions = ['DESC', 'ASC'];

        // Creamos las variables que ordenarán y establecerán el orden en el que mostraremos los resultados
        const orderBy = validOrderOptions.includes(order) ? order : 'createdAt';

        const orderDirection = validDirectionOptions.includes(direction)
            ? direction
            : 'DESC';

        // Realizar una consulta a la base de datos para recuperar los productos
        let travels; // Realizar una consulta a la base de datos para recuperar los productos

        // Si existe una búsqueda 'search', haremos una consulta añadiendo la búsqueda
        if (search) {
            [travels] = await connection.query(
                `SELECT t.*, u.username, u.avatar FROM travel t 
                INNER JOIN user u ON t.idUser = u.id 
                WHERE place LIKE ? OR activity LIKE ?
                ORDER BY ${orderBy} ${orderDirection}`,
                [`%${search}%`, `%${search}%`]
            );
        } else {
            [travels] = await connection.query(
                `SELECT t.*, u.username, u.avatar FROM travel t 
                INNER JOIN user u ON t.idUser = u.id
                ORDER BY ${orderBy} ${orderDirection}`,
                [`%${search}%`, `%${search}%`]
            );
        }

        // Creamos el array que devolveremos en la respuesta, contendrá los datos del producto junto a sus fotos
        const data = [];

        // Cada producto tiene sus imagenes de producto, y recibimos su id por lo que podemos recorrer con un bucle
        // los productos recibidos y buscar sus fotos

        for (let i = 0; i < travels.length; i++) {
            const [photos] = await connection.query(
                `SELECT name FROM travel_photo WHERE idTravel = ?`,
                [travels[i].id]
            );

            // Pusheamos los datos del producto junto a sus fotos en el array que devolveremos en la respuesta (data)
            data.push({
                ...travels[i],
                photos,
            });
        }

        // Una vez recibidos los productos podemos responder con la lista de los productos en BBDD
        res.send({
            status: 'Ok',
            data: data,
        });
    } catch (error) {
        // Si ocurre algun error lo pasamos (en el servidor lo captura el middleware de error para mostrarlo)
        next(error);
    } finally {
        // Para evitar llegar al límite de conexiones y saturar la base de datos
        // Cerramos la conexion
        if (connection) connection.release();
    }
};

// Exportar el controlador
module.exports = getTravels;
