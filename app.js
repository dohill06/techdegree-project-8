const express = require('express');
const sequelize = require('./models').sequelize;
const app = express();








sequelize.sync().then(() => {
    app.listen(3000);
});
