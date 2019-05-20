const express = require('express');
const sequelize = require('./models').sequelize;
const Book = require('./models').Book;

const app = express();

app.use('/static', express.static('public'));
app.set('view engine', 'pug');

app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.redirect('/books');
});

app.get('/books', (req, res) => {
    Book.findAll({order: [['author', 'ASC']]}).then((books) => {
        res.render('index', {books: books, title: 'Books'});
    }).catch((err) => {
        res.render('error', {error: err});
        console.log(err);
    });
});

app.get('/books/new', (req, res) => {
    res.render('new-book', {title: 'New Book'});
});

app.post('/books/new', (req, res) => {
    Book.create(req.body).then((book) => {
        res.redirect(`/books/${book.id}`);
    })
});

app.get('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then((book) => {
        if(book) {
            res.render('update-book', {book: book, title: 'Update Book'});
        } else {
            res.render('error');
        }
    }).catch((err) => {
        res.render('error', {error: err});
        console.log(err);        
    });
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
