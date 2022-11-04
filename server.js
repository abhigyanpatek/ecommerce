const express = require('express');
const app = express();
const serverConfigs = require('./configs/server.config');
const { initializeTables } = require('./dao/repository/tableInitializers');
const { createRoutes } = require('./routes/parentRouter');
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send({
        message: "Welcome to our ecommerce application!"
    });
})

app.listen(serverConfigs.PORT, serverConfigs.HOST, () => {
    console.log(`Server is running on ${serverConfigs.HOST}:${serverConfigs.PORT}`);
});

(() => {
    // 1. configure Routes
    createRoutes(app);
    // 2. initialize Tables in DB if environment is development
    if (serverConfigs.ENV === 'dev') {
        initializeTables(false);
    }
})();