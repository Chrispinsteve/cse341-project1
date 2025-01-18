const express = require('express');
const mongodb = require('./data/database');
const app = express();

const port = process.env.PORT  || 3000;

app.use('/', require('./routes'));

mongodb.initDb((err) => {
    if(err){
        console.error('Failed to connect to the database:', err);
    }
    else{
        app.listen(port, () => {console.log(`Database is running on port ${port}`)})
    }
})

