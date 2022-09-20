require('dotenv').config();

const getDB = require('./getDB');

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
    } catch (error) {
        console.error(error);
    } finally {
        if (connection) connection.release();
        process.exit();
    }
}

main();