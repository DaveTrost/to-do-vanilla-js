const client = require('../lib/client');

client.connect()
    .then(() => {
        return client.query(`
            CREATE TABLE IF NOT EXISTS tasks (
                id SERIAL PRIMARY KEY NOT NULL,
                task VARCHAR(256) NOT NULL UNIQUE,
                inactive BOOLEAN NOT NULL DEFAULT FALSE
            );
        `);
    })
    .then(
        () => console.log('create tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });
