const express = require('express');
const sequelize = require('./models').sequelize;


const app = express();



app.get('/', (req, res) => {
    res.redirect('/books');
});

app.get('/books', (req, res) => {

});

app.get('/books/new', (req, res) => {

});

app.post('/books/new', (req, res) => {

});

app.get('/books/:id', (req, res) => {

});

app.post('/books/:id', (req, res) => {

});

app.get('/books/:id/delete', (req, res) => {

});



sequelize.sync().then(() => {
    app.listen(3000);
});
