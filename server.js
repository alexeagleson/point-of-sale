require('dotenv').config();

const express = require('express');
const path = require('path');

const app = express();
const publicPath = path.join(__dirname, 'public');

app.use(express.static(publicPath));


app.get('/', (req, res) => {
    res.status(200).sendFile('index.html');
});

app.listen(process.env.PORT, () => {
    console.log('App is listening on port ' + process.env.PORT);
})