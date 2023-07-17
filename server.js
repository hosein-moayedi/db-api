const express = require('express');
const sqlite3 = require('sqlite3').verbose();

// Create Express app
const app = express();
app.use(express.json()); // Enable parsing of JSON bodies

// Connect to the SQLite database
const db = new sqlite3.Database('/etc/x-ui/x-ui.db', (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});


app.post('/db', (req, res) => {
    const { query } = req.body;
    db.all(query, (err, rows) => {
        if (err) {
            console.error(err.message);
            res.status(500).json({ message: 'Error executing the query' });
        } else {
            res.json(rows);
        }
    });
});

const port = 36749;
app.listen(port, () => {
    console.log(`API server is running on port ${port}`);
});
