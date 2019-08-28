const client = require('../lib/client');

client.query(`
    DROP TABLE IF EXISTS users;
    DROP TABLE IF EXISTS tasks;
`)
    .then(
        () => console.log('drop tables complete'),
        err => console.log(err)
    )
    .then(() => {
        client.end();
    });
