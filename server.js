// patE46Xvbf22EGjjh.9d191bb9ebd68513b3721b670b0b95a4cc56a614f57b47851144afc6d212fb36
const Airtable = require('airtable');
const base = new Airtable({apiKey: 'patE46Xvbf22EGjjh.9d191bb9ebd68513b3721b670b0b95a4cc56a614f57b47851144afc6d212fb36'}).base('app1p7ogrBx2EnAoN');

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

app.get('/contacts', (req, res) => {
    let contacts = [];

    base('contacts').select({
        view: 'Grid view'
    }).eachPage((records, fetchNextPage) => {
        records.forEach(record => {
            contacts.push({
                id: record.id,
                name: record.get('Name'),
                email: record.get('Email')
            });
        });
        fetchNextPage();
    }, (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Server Error');
            return;
        }
        res.json(contacts);
    });
});

app.post('/contacts', (req, res) => {
    base('contacts').create([
        {
            "fields": {
                "Name": req.body.name,
                "Email": req.body.email
            }
        }
    ], 
    (err, records) => {
        if (err) {
            console.error(err);
            return;
        }
        res.sendStatus(200);
    });
});

app.delete('/contacts', (req, res) => {
    base('contacts').destroy([req.body.id],
    (err, deletedRecords) => {
        if (err) {
            console.error(err);
            return;
        }
        res.sendStatus(200);
    });
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
