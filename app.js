const express = require('express');
const sequelize = require('./models').sequelize;
const routes = require('./routes');


const app = express();

app.set('view engine', 'pug');

app.use('/static', express.static('public'));
app.use(express.urlencoded({
    extended: false
}));


app.use(routes);

app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('page-not-found');
});



sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('The app is running on localhost:3000');
    });
});