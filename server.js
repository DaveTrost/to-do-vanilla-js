// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

// Database Client
client.connect();

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

app.get('/api/tasks', (req, res) => {
    client.query(`
        SELECT
            id,
            task,
            is_complete AS "isComplete"
        FROM tasks
        ORDER BY id;
    `)
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/tasks', (req, res) => {
    client.query(`
        INSERT INTO tasks(task)
        VALUES($1)
        RETURNING
            id,
            task,
            is_complete AS "isComplete";
    `,
    [req.body.task]
    )
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.put('/api/tasks/:id', (req, res) => {
    console.log('task new completion status is: ', req.body.isComplete);
    client.query(`
        UPDATE tasks SET 
            task = $1,
            is_complete = $2
        WHERE id = $3
        RETURNING
            id,
            task,
            is_complete AS "isComplete";
    `,
    [req.body.task, req.body.isComplete, req.body.id]
    )
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

// Start the server
app.listen(PORT, () => {
    console.log('server running on PORT', PORT);
});