const express = require('express');
const router = express.Router();
const Book = require('../models').Book;

// home route redirect
router.get('/', (req, res) => {
    res.redirect('/books');
});
// book listing route
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
// new book form route
router.get('/books/new', (req, res) => {
    res.render('new-book', {
        title: 'New Book'
    });
});
// add new book form route
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
// book detail update form route
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
// add update detail form route
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
// delete book route
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
// export router
module.exports = router;