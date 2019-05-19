const express = require('express');
const sequelize = require('./models').sequelize;
const Book = require('./models').Book;

const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug');



app.get('/', (req, res) => {
    res.redirect('/books');
});

app.get('/books', (req, res) => {
    res.render('index', {title: 'Books'});
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
    app.listen(3000, () => {
        console.log('The app is running on localhost:3000');
    });
});
