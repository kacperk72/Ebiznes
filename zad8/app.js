const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require('cors');
const connection = require('./connection.js')

app.use(bodyParser.json());
app.use(cors()); // Dodaj to do swojego kodu
app.use(express.json());
app.use(cors({
    origin: 'http://localhost:5173'
}));
  

app.post('/register', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.query('INSERT INTO users (login, password) VALUES (?, ?)', [username, password], function(error, results) {
        if (error) {
            console.log(error);
            res.status(500).send('Server error');
        } else {
            res.send('User registered successfully');
        }
    });
});

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    connection.query('SELECT * FROM users WHERE login = ?', [username], function(error, results) {
        if (error) {
            console.log(error);
            res.status(500).send('Server error');
        } else {
            if (results.length > 0) {
                if(password == results[0].password) {
                    res.send('Logged in successfully');
                } else {
                    res.send('Wrong username/password combination');
                }
            } else {
                res.send('User does not exist');
            }
        }
    });
});
  
app.listen(3000, function() {
    console.log('Server is running on port 3000');
});
