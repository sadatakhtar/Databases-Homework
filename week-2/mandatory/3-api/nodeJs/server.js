const express = require('express');
const { Pool, Client } = require('pg');
const app = express();

const PORT = 3000;

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'cyf_ecommerce',
    password: 'postgres',
    port: 5432
});

// const client = new Client({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'cyf_ecommerce',
//     password: 'postgres',
//     port: 5432
// });

// client.connect()
// .then(() => console.log('Connected to db!'))
// .then(() => client.query("select * from customers"))
// .then(results => console.table(results.rows))
// .catch(e => console.log(e))
// .finally(() => client.end());

//Customers route
app.get('/customers', (req, res) => {
    pool.query('SELECT * FROM customers', (error, result) => {
        res.json(result.rows);
    });
});

//Suppliers route
app.get('/suppliers', (req, res) => {
    pool.query('select * from suppliers', (error, result) => {
        res.json(result.rows);
    })
});

//Products & suppliers on end point /products
app.get("/products", (req, res) => {
    pool.query('select p.product_name, s.supplier_name from products AS p inner join suppliers AS s ON s.id=p.supplier_id', (error, result)=> {
        res.json(result.rows);
    })
});

//Listening on selected port
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}. Ready to accept requests!`);

});