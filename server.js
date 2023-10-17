const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', (req,res) => {
    res.sendFile('index');
});

app.get('/data', (req,res) => {
    fs.readFile('data.json', 'utf-8', (err, data) => {
        res.json(JSON.parse(data));
    } );
});

app.post('/newData', (req, res) => {
    console.log(req.body);
    fs.writeFile('data.json', JSON.stringify(req.body), 'utf-8', (err) => {});
    fs.readFile('data.json', 'utf-8', (err, data) => {
        res.json(JSON.parse(data));
    });

});

app.listen(4242, () => {
    console.log('Server up and running on 4242');
});
