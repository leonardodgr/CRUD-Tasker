const express = require('express');
const connection = require('./dbSetup');

const app = express();
const port = 8082;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Rotas para CRUD

// CREATE
app.post('/tasks', (req, res) => {
    console.log(req.body);
    const { title, description } = req.body;
    const sql = 'INSERT INTO tasks (title, description) VALUES (?,?)';
    connection.query(sql, [title, description], (err, results) => {
        if (err) throw err;
        res.send('Tarefa criada com sucesso!');
    });
});

// READ
app.get('/tasks', (req, res) => {
    const sql = 'SELECT * FROM tasks';
    connection.query(sql, (err, results) => {
        if (err) throw err;
        res.json(results);
    });
});

// UPDATE
app.put('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    const sql = 'UPDATE tasks SET title=?, description=? WHERE id=?';
    connection.query(sql, [title, description, id], (err, results) => {
        if (err) throw err;
        res.send('Tarefa atualizada com sucesso!');
    });
});

// DELETE
app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const sql = 'DELETE FROM tasks WHERE id=?';
    connection.query(sql, [id], (err, results) => {
        if (err) throw err;
        res.send('Tarefa deletada com sucesso.');
    });
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
