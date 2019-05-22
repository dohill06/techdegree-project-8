const express = require('express');
const sequelize = require('./models').sequelize;
const routes = require('./routes');

// set up express
const app = express();
// use pug in the view engine
app.set('view engine', 'pug');
// set up static route for the public folder/css
app.use('/static', express.static('public'));
// parse url encoding
app.use(express.urlencoded({
    extended: false
}));
// use routes
app.use(routes);
// 404 page not found
app.use((req, res, next) => {
    const err = new Error('Page Not Found');
    err.status = 404;
    next(err);
});
// error handler middleware
app.use((err, req, res, next) => {
    res.locals.error = err;
    res.status(err.status);
    res.render('page-not-found');
});


// sync with db and set up port
sequelize.sync().then(() => {
    app.listen(3000, () => {
        console.log('The app is running on localhost:3000');
    });
});