// Load Environment Variables from the .env file
require('dotenv').config();

// Application Dependencies
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const client = require('./lib/client');

// Auth
const ensureAuth = require('./lib/auth/ensure-auth');
const createAuthRoutes = require('./lib/auth/create-auth-routes');
const authRoutes = createAuthRoutes({
    selectUser(email) {
        return client.query(`
        SELECT id, email, hash, display_name as "name" 
        FROM users
        WHERE email = $1;
        `,
        [email]
        ).then(result => result.rows[0]);
    },
    insertUser(user, hash) {
        return client.query(`
            INSERT into users (email, hash, display_name)
            VALUES ($1, $2, $3)
            RETURNING id, email, display_name as "name";
        `,
        [user.email, hash, user.name]
        ).then(result => result.rows[0]);
    }
});

// Application Setup
const app = express();
const PORT = process.env.PORT;
app.use(morgan('dev')); // http logging
app.use(cors()); // enable CORS request
app.use(express.static('public')); // enable serving files from public
app.use(express.json()); // enable reading incoming json data

// setup authentication routes
app.use('/api/auth', authRoutes);

// everything that starts with "/api" below here requires an auth token!
app.use('/api', ensureAuth);

app.get('/api/tasks/:user_id', (req, res) => {
    client.query(`
        SELECT
            id,
            task,
            is_complete AS "isComplete"
        FROM tasks
        WHERE user_id = $1
        ORDER BY id;
    `,
    [req.params.user_id])
        .then(result => {
            res.json(result.rows);
        })
        .catch(err => {
            res.status(500).json({
                error: err.message || err
            });
        });
});

app.post('/api/tasks/:user_id', (req, res) => {
    client.query(`
        INSERT INTO tasks(task, user_id)
        VALUES($1, $2)
        RETURNING
            id,
            task,
            is_complete AS "isComplete";
    `,
    [req.body.task, req.params.user_id]
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


app.delete('/api/tasks/:id', (req, res) => {
    client.query(`
        DELETE FROM tasks
        WHERE id = $1
        RETURNING
            id,
            task,
            is_complete AS "isComplete";
    `,
    [req.params.id]
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

app.get('/users/:email', (req, res) => {
    client.query(`
        SELECT
            id,
            email,
            display_name AS "name"
        FROM users
        WHERE email = $1;
    `,
    [req.body.email])
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