const client = require('../lib/client');

client.query(`
    CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY NOT NULL,
        email VARCHAR(256) NOT NULL,
        hash VARCHAR(256) NOT NULL,
        display_name VARCHAR(256) NOT NULL
    );
    CREATE TABLE IF NOT EXISTS tasks (
        id SERIAL PRIMARY KEY NOT NULL,
        task VARCHAR(256) NOT NULL,
        is_complete BOOLEAN NOT NULL DEFAULT FALSE
    );
`)
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });
