const express = require('express');
const app = express();

const { Pool, Client } = require('pg')
const pool = new Pool({
    user: 'postgres',
    host: 'hworksdb-instance.cpbjiroaeulc.sa-east-1.rds.amazonaws.com',
    database: 'hworks_teste',
    password: 'home485915#works',
    port: '5432'
})


//const mysql = require('mysql');

const bodyparser = require('body-parser');
const path = require('path');

app.listen('3000',()=>{
    console.log('Nodemon rodando com tudo!');
});

//Body Parser
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}));
app.use(express.static(path.join(__dirname,'public')));


//Conexão com database
/*
const db = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'node'
});
*/

/*
db.connect(function(err){
    if(err){
        console.log('Não foi possivel conectar no banco de dados!');
    }
})
*/

pool.connect(function(err){
    if(err){
        console.log('Não foi possivel conectar no banco de dados');
    };

});


//Pagina Login
app.get('/',function(req,res){
        res.render('index',{});
});


//Pagina Clientes
app.get('/clientes',function(req,res){


    /*
    let query = pool.query("SELECT * FROM lancamento_os",function(err,res){
        res.render('clientes',{lista:res});
    })
*/

    pool.query("SELECT * FROM lancamento_os", (err, results) => {
        if(err){
            throw err
        }
        console.log(results.rows)
        res.render('clientes', {lista:results.rows})
    })

  
 
});

//Pagina Registrar
app.get('/registrar',function(req,res){
    res.render('cadastro',{});
});

app.post('/registrar',function(req,res){
    let centro_custo = req.body.centro_custo;
    let pavto = req.body.pavto;
    let pesagem = req.body.pesagem;
    let entulho = req.body.entulho;
    let n_os = req.body.n_os;
    let data = req.body.data;
    let foto = req.body.foto;
    let logradouro = req.body.logradouro;
    let n_casa = req.body.n_casa;
    let bairro = req.body.bairro;
    let comp = req.body.comp;
    let larg = req.body.larg;

    const queryS = "INSERT INTO lancamento_os (centro_custo,pavto,pesagem,entulho,n_os,data,foto,logradouro,n_casa,bairro,comp,larg,area) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13)";
    const valuesS = [centro_custo,pavto,pesagem,entulho,n_os,data,foto,logradouro,n_casa,bairro,comp,larg,comp*larg];
    

    if(centro_custo && data && pavto && comp && larg){
        pool.query(queryS, valuesS, (err,results) => {
            if(err){
                console.log(err.stack);
            }
        })
    }

    
    res.render('cadastro',{});
})


