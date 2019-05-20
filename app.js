const express = require('express');
const sequelize = require('./models').sequelize;
const Book = require('./models').Book;

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));


app.get('/', (req, res) => {
    res.redirect('/books');
});

app.get('/books', (req, res) => {
    Book.findAll({order: [['author', 'ASC']]}).then((books) => {
        res.render('index', {books, title: 'Books'});
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
            res.render('update-book', {book, title: 'Update Book'});
        } else {            
            res.render('error', {error: '404'});
            console.log('error');
        }
    }).catch((err) => {
        res.render('error', {error: err});
        console.log(err);        
    });
});

app.post('/books/:id', (req, res) => {

});

app.post('/books/:id/delete', (req, res) => {
    Book.findByPk(req.params.id).then((book) => {
        book.destroy();
    }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        res.render('error', {error: err});
        console.log(err);        
    });
});



sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('The app is running on localhost:3000');
    });
});
