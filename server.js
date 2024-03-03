const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aktas05alperen',
    database: 'db'
});

connection.connect((err) => {
    if (err) {
        console.error('Veritabanına bağlanırken hata oluştu: ' + err.stack);
        return;
    }
    console.log('Veritabanına başarıyla bağlandı: ' + connection.threadId);
});

app.post('/insert', (req, res) => {
    const formObject = req.body;

    const sql = `INSERT INTO table1 (ID, category, topic, city, nameSurname, email, phone, formText) 
                VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

    const values = [
        formObject.ID,
        formObject.category,
        formObject.topic,
        formObject.city,
        formObject.nameSurname,
        formObject.email,
        formObject.phone,
        formObject.text
    ];

    connection.query(sql, values, (err, result) => {
        if (err) {
            console.error('Bir kayıt eklenirken hata oluştu: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        console.log('Bir kayıt eklendi, ID:', result.insertId);
        res.json({ success: true });
    });
});

app.get('/fetchData', (req, res) => {
    connection.query('SELECT * FROM table1', (err, results) => {
        if (err) {
            console.error('Veritabanından veri çekilirken bir hata oluştu: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

app.delete('/delete/:id', (req, res) => {
    const formId = req.params.id;

    const sql = `DELETE FROM table1 WHERE ID = ?`;

    connection.query(sql, [formId], (err, result) => {
        if (err) {
            console.error('Bir kayıt silinirken hata oluştu: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        console.log('Bir kayıt silindi, ID:', formId);
        res.json({ success: true });
    });
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;

    const sql = 'SELECT * FROM table2 WHERE email = ? AND parola = ?';
    const values = [email, password];

    connection.query(sql, values, (err, results) => {
        if (err) {
            console.error('Giriş sırasında bir hata oluştu: ' + err.message);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }

        if (results.length > 0) {
            res.json({ success: true });
        } else {
            res.status(401).json({ error: 'Invalid credentials' });
        }
    });
});

app.listen(PORT, () => {
    console.log(`Sunucu ${PORT} portunda çalışıyor`);
});
