const fs = require("fs/promises");
const express = require("express");
const cors = require("cors");
const {v4 : uuid} = require("uuid");
const mysql = require('mysql');
const multer = require("multer");
const bodyParser = require('body-parser');



const app = express();


app.use(express.json());
app.use(bodyParser.urlencoded({extended: true}));

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
});

const Storage = multer.diskStorage({
    destination: 'uploads',
    filename: (req, file, cb)=>{
        cb(null, file.originalname);
    },
});
const upload = multer({storage: Storage, limits: { fileSize: 2 * 4096 * 4096 },
}).single('testImage');


app.post('/add-project', (req, res) => {
    
    upload(req, res, (err)=>{
        let sql = 'INSERT INTO project SET ?';
        if(err)
            res.status(500).json(err);
        else{
            let post = {
                project_id: uuid(), 
                project_name: req.body.nom, 
                project_desc: req.body.description,
                project_status: "En Cours"
            }
            let query = db.query(sql, post, (err, result) => {
                if(err) throw err;
        
            })

            let sqlimage = 'INSERT INTO image SET ?';
            let postimage = {
                id: uuid(),
                image_url : 'uploads/' + req.file.originalname,
                project_id : post.project_id
                }
            let queryimage = db.query(sqlimage, postimage, (err, result) => {
                if(err) throw err;
            })
            
            
            let nbrbloc = parseInt(req.body.nbr_bloc);
            let nbretage = parseInt(req.body.nbr_etage);
            let nbrappart = parseInt(req.body.nbr_appart);
            
            for(i = 0 ;  i < nbrbloc ; i++){
                let sqlbloc= 'INSERT INTO bloc SET ?';
                let postbloc = {
                    bloc_id: uuid(),
                    bloc_name : `${post.project_name} - Bloc ${i+1}`,
                    project_id : post.project_id
                }
                let queryBloc = db.query(sqlbloc, postbloc, (err, result) => {
                    if(err) throw err;
                })
                for(j = 0 ; j < nbretage ; j++){
                    let sqletage= 'INSERT INTO etage SET ?';
                    let postetage = {
                        etage_id: uuid(),
                        etage_name : `${post.project_name} - Bloc ${i+1} - Etage ${j+1}`,
                        bloc_id : postbloc.bloc_id
                    }
                    let queryEtage = db.query(sqletage, postetage, (err, result) => {
                        if(err) throw err;
                    })
                    for(k = 0 ; k < nbrappart ; k++){
                        let sqlappart= 'INSERT INTO appartement SET ?';
                        let postappart = {
                            appartement_id: uuid(),
                            appartement_name : `${post.project_name} - Bloc ${i+1} - Etage ${j+1} - Appartement ${k+1}`,
                            etage_id : postetage.etage_id
                        }
                        let queryAppart = db.query(sqlappart, postappart, (err, result) => {
                            if(err) throw err;
                        })
                    }
                }
                
            }
            
            res.json({...post, ...postimage});
            
        }
    });
    

})

app.get('/get-pending-project', (req, res)=>{
    let sql = `SELECT * FROM project WHERE project_status = 'En Cours'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
});

app.get('/get-finished-project', (req, res)=>{
    let sql = `SELECT * FROM project WHERE project_status = 'Fini'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
});

app.get('/get-project/:id', (req, res)=>{
    let sql = `SELECT * FROM project WHERE project_id = '${req.params.id}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result[0]);
    })
})

app.put('/finished-project/:id', (req, res)=>{
    let sql = `UPDATE project SET project_status = 'Fini' WHERE project_id = '${req.params.id}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
});
app.put('/pending-project/:id', (req, res)=>{
    let sql = `UPDATE project SET project_status = 'En Cours' WHERE project_id = '${req.params.id}'`;
    let query = db.query(sql, (err, result) => {
        if(err) throw err;
        res.json(result);
    })
})

    

app.listen(process.env.PORT, ()=>{
    console.log(`Server running on port ${process.env.PORT}`);
})