const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const {v4 : uuid} = require("uuid");
const mysql = require('mysql');


const app = express();


app.use(express.json());
app.use(cors());

require('dotenv').config();


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    // password: 'DaifouHkt26062003',
    database: 'pfe_immobile'
});

db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MySql Connected...');
});

app.post('/auth', (req, res) => {
    let {email, password} = req.body;
    let sql = `SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        if(result.length > 0){
            res.status(200).json(result[0]);
        }else{
            res.status(401).json({"error" : "Wrong username or password"});
        }
    });
})


app.get('/api/get', (req, res) => {
    let sql = 'SELECT * FROM users';
    let query = db.query(sql, (err, results) => {
        if(err) throw err;
        console.log(results);
        res.send(results);
    });
})

app.post('/auth/signup', (req, res) => {
    let sql = 'INSERT INTO users SET ?';
    let post = {fullname: req.body.fullname, email: req.body.email, password: req.body.password}

    let query = db.query(sql, post, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send('User added...');
    }
    );
})

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})