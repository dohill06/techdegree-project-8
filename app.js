const express = require('express');
const sequelize = require('./models').sequelize;
const Book = require('./models').Book;

const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));
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

app.get('/books/:id', (req, res, next) => {
    Book.findByPk(req.params.id).then((book) => {
        if(book) {
            res.render('update-book', {book, title: 'Update Book'});
        } else {            
            const err = new Error('Sorry, no id found.');
            err.status = 404;
            next(err);
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

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    res.status(err.status);
    res.render('page-not-found');
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('error');
});



sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('The app is running on localhost:3000');
    });
});
