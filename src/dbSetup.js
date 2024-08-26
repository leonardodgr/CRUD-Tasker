const mysql = require('mysql2');
const newConnection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'google123',
    database: 'new_data_base_2'
});

newConnection.connect((err) => {
    if (err) {
        console.log('Erro ao conectar ao MySql:', err)
        return
    }
    console.log('Conectado ao MySQL!')
});

module.exports = newConnection;
