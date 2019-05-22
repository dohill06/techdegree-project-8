const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


router.get('/', (req, res) => {
    res.redirect('/books');
});

router.get('/books', (req, res) => {
    Book.findAll({
        order: [
            ['author', 'ASC']
        ]
    }).then((books) => {
        res.render('index', {
            books,
            title: 'Books'
        });
    }).catch((err) => {
        res.render('error', {
            error: err
        });
        console.log(err);
    });
});

router.get('/books/new', (req, res) => {
    res.render('new-book', {
        title: 'New Book'
    });
});

router.post('/books/new', (req, res) => {
    Book.create(req.body).then(() => {
        res.redirect('/');
    }).catch((err) => {
        if (err.name === 'SequelizeValidationError') {
            res.render('new-book', {
                title: 'New Book',
                errors: err.errors
            });
        } else {
            throw err;
        }
    }).catch((err) => {
        res.render('error', {
            error: err
        });
        console.log(err);
    });
});

router.get('/books/:id', (req, res, next) => {
    Book.findByPk(req.params.id).then((book) => {
        if (book) {
            res.render('update-book', {
                book,
                title: 'Update Book'
            });
        } else {
            const err = new Error('Sorry, no id found.');
            err.status = 404;
            next(err);
        }
    }).catch((err) => {
        res.render('error', {
            error: err
        });
        console.log(err);
    });
});

router.post('/books/:id', (req, res) => {
    Book.findByPk(req.params.id).then((book) => {
        book.update(req.body).then(() => {
                res.redirect('/');
            })
            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    res.render('update-book', {
                        book,
                        title: 'Update Book',
                        errors: err.errors
                    });
                } else {
                    throw err;
                }
            }).catch((err) => {
                res.render('error', {
                    error: err
                });
                console.log(err);
            });
    });
});

router.post('/books/:id/delete', (req, res) => {
    Book.findByPk(req.params.id).then((book) => {
        book.destroy();
    }).then(() => {
        res.redirect('/');
    }).catch((err) => {
        res.render('error', {
            error: err
        });
        console.log(err);
    });
});

module.exports = router;