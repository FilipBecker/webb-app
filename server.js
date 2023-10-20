// patE46Xvbf22EGjjh.9d191bb9ebd68513b3721b670b0b95a4cc56a614f57b47851144afc6d212fb36

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
