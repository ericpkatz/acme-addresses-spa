try{
  Object.assign(process.env, require('./env'));
}
catch(ex){

}
console.log(process.env.GOOGLE_API_KEY);
const db = require('./db');
const { Address } = db.models;
const express = require('express');
const ejs = require('ejs');
const app = express();
app.use(express.json());
app.set('view engine', 'html');
app.engine('html', ejs.renderFile);
const path = require('path');

app.use('/assets', express.static(path.join(__dirname, 'assets')));

app.get('/', (req, res, next)=> res.render('index', { GOOGLE_API_KEY: process.env.GOOGLE_API_KEY}));

app.get('/api/addresses', (req, res, next)=> {
  Address.findAll()
    .then( addresses => res.send(addresses))
    .catch(next);
});

app.delete('/api/addresses/:id', (req, res, next)=> {
  Address.findByPk(req.params.id)
    .then( address => address.destroy())
    .then( () => res.sendStatus(204))
    .catch(next);
});

app.post('/api/addresses', (req, res, next)=> {
  Address.create(req.body)
    .then( address => res.send(address))
    .catch(next);
});


const port = process.env.PORT || 3000;
db.syncAndSeed()
  .then(()=> app.listen(port, ()=> console.log(`listening on port ${port}`))); 
