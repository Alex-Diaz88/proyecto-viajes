require('dotenv').config();

const getDB = require('./getDB');
const bcrypt = require('bcrypt');

async function main() {
    let connection;

    try {
        connection = await getDB();

        console.log('Eliminando tablas...');
        await connection.query(`drop table if exists vote`);
        await connection.query(`drop table if exists comment`);
        await connection.query(`drop table if exists travel_photo`);
        await connection.query(`drop table if exists travel`);
        await connection.query(`drop table if exists user`);

        console.log('Tablas eliminadas.');

        console.log('Creando tablas...');

        await connection.query(`
            create table if not exists user (
                id int unsigned primary key auto_increment,
                username varchar(50) not null,
                email varchar(100) not null,
                password varchar(200) not null,
                avatar varchar(255),
                active boolean default false,
                createdAt datetime default CURRENT_TIMESTAMP
                           
            )
        `);

        await connection.query(`
            create table if not exists travel (
                id int unsigned primary key auto_increment,
                title varchar (100) not null,
                entry varchar(200) not null,
                place enum ('Coriolis', 'Jina', 'Kua', 'Lubau', 'Surha', 'Xene') not null,
                activity enum ('Cultural', 'Deportes', 'Gastronomía', 'Naturaleza', 'Relajación') not null,
                content text,
                createdAt datetime default CURRENT_TIMESTAMP,
                idUser int unsigned not null,
                foreign key (idUser) references user(id) on delete cascade
            )        
        `);

        await connection.query(`
            create table if not exists travel_photo (
                id int unsigned primary key auto_increment,
                name varchar (255) not null,
                idTravel int unsigned not null,
                foreign key (idTravel) references travel (id) on delete cascade        
            )
        `);

        await connection.query(`
            create table if not exists comment (
                id int unsigned primary key auto_increment,
                content text,
                createdAt datetime default CURRENT_TIMESTAMP,
                idUser int unsigned not null,
                idTravel int unsigned not null,
                foreign key (idUser) references user (id) on delete cascade,
                foreign key (idTravel) references travel (id) on delete cascade
            )        
        `);

        await connection.query(`
            create table if not exists vote (
                id int unsigned primary key auto_increment,
                voted boolean default false,
                idUser int unsigned not null,
                idTravel int unsigned not null,
                foreign key (idUser) references user (id) on delete cascade,
                foreign key (idTravel) references travel (id) on delete cascade
            )
        `);

        console.log('¡Tablas creadas con éxito!');

        const hashedPassword = await bcrypt.hash('12345', 10);

        await connection.query(
            `INSERT INTO user (id, username, email,  password, avatar, active)
                VALUES (1, 'Rick', 'rickmail@gmail.com', ?, 'Rick_Sanchez_Avatar.png', true),
                (2, 'Morty', 'mortymail@gmail.com', ?, 'Morty_Avatar.jpg', true),
                (3, 'StarLord', 'starlordmail@gmail.com', ?, 'Starlord_Avatar.jpg', true),
                (4, 'Bender', 'bendermail@gmail.com', ?, 'Bender_Avatar.jpg', true),
                (5, 'Paco', 'pacomail@gmail.com', ?, 'Paco_Avatar.png', true)`,
            [
                hashedPassword,
                hashedPassword,
                hashedPassword,
                hashedPassword,
                hashedPassword,
            ]
        );

        console.log('¡Usuarios insertados con éxito!');

        await connection.query(`
            INSERT INTO travel (id, title, entry, place, activity, content, idUser)
                VALUES (1, 'Escapada a Coriolis', 'Ruta de senderismo por glaciares', 'Coriolis', 'Naturaleza', 'No se trata de una ruta más, no. Este recorrido te va a permitir conocer el mayor glaciar de Coriolis que tiene 23 Km de longitud y nosotros iremos por un sendero de montaña paralelo y por una cota superior durante unos 7 Km acompañandolo en su recorrido.', 1),
                (2, 'Ginkana extrema', 'Pon a prueba tu cuerpo en esta experiencia inolvidable y lo más seguro es que acabes todo sudado', 'Surha', 'Deportes', 'Survivor Race Surha, una carrera de obstáculos que va más allá, transformando y mejorando tu actitud y estilo de vida.  Survivor significa levantarse por la mañana y sentirse capaz de superar todos los obstáculos que nos encontramos día a día; ya sea solo, en pareja, con amigos, amigas o familia.', 2),
                (3, 'Ruta gastronómica en Lubau', 'Te llenarás la barriga en esta magnífica escapada', 'Lubau', 'Gastronomía', 'Desde su hotel recorrerá la capital, estando junto a todos los centros de interés, culturales y de ocio de la ciudad. Sumergido en la cultura del vino, en la inquitud artística y arquitectónica de la ciudad y en el placer de recorrerla disfutando de ella y al terminar estar en la misma puerta del hotel. Ofrece wifi gratuito, prensa y dispone también de garaje (consultar precios) No se admiten mascotas.', 3),
                (4, 'Partido de Fútbol a baja gravedad', 'Prepárate para disfrutar al máximo en una experiencia única', 'Xene', 'Deportes', 'Al poder reducir el peso corporal conseguimos que las articulaciones de las personas no sufran tanto, así como para tomar confianza e ir avanzando de manera paulatina. Además, permite correr durante más tiempo por lo que es muy gratificante a la hora de alcanzar objetivos.
                Get ready para hacer filigranas increíbles en el aire!', 4),
                (5, 'Casa Rural Paco', 'Viaje de relax y tranquilidad absoluta en casa de Paco', 'Kua', 'Relajación', 'Relájate y evádete de la rutina con nuestras experiencias de spa. Masajes para dos, spas y balnearios, baños árabes, chocolaterapia y mucho más. Todas nuestras experiencias son regalos perfectos para ella y para él, para hacer solo o en pareja. ¡Momentos de relax y belleza ideales!', 5),
                (6, 'Ruta por museos de ciencia y tecnología alienígena', 'Si eres una persona curiosa y a la que le gusta la ciencia este es tu lugar', 'Jina', 'Cultural', 'El Museo Nacional de Ciencia y Tecnología es un museo tecnológico dedicado a la promoción y conservación de la tecnología. Posee una colección de más de 17.000 instrumentos científicos, dispositivos tecnológicos, vehículos, máquinas y herramientas industriales desde el siglo XVI hasta la actualidad.', 5);
        `);

        console.log('¡Viajes insertados con éxito!');

        await connection.query(`
            INSERT INTO comment (id, content, idUser, idTravel)
                VALUES (1, 'Menuda pasada, los glaciares son enormes!', 5, 1),
                (2, 'Me he cansado de comer y mira que es difícil', 4, 3),
                (3, 'Estoy cansadísimo, no se si lo volvería a hacer...', 4, 2),
                (4, '¿Es necesario llevar bañador? Estoy pensando en hacer esta actividad', 1, 2),
                (5, 'La cantidad de museos es tremenda. Lo mejor son los alienígenas momificados!', 2, 6),
                (6, 'La parte de armamento militar da miedo...', 3, 6),
                (7, 'Nadie mejor que Paco para preparar un finde de relax', 1, 5),
                (8, 'Perdimos pero me lo pasé estupendo', 2, 4),
                (9, 'Aún me duele el codazo que me dio Paco', 1, 4),
                (10, 'No llores que no fue para tanto', 5, 4);
        
        `);

        console.log('¡Comentarios insertados con éxito!');
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();
