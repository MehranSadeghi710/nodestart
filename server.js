const express = require('express');
const app = express();

global.config = require('./config.js');

app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended : false }));


app.listen(config.port, ()=>{
    console.log(`Server started on port ${config.port}`);
})
