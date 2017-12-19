const express = require("express");
const mongodb = require('mongodb');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const database = "nodeData"
let db;

app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

MongoClient.connect(url, function(err, client) {
    console.log(err);
    db = client.db(database);
})   



app.get("/hello",(req,res)=>{ 
    db.collection('students').find().toArray(function(err,docs){
        res.json(docs)
    })
})

app.post("/submit",(req,res)=>{
    res.send("hi"+req.body.username+" your pass is "+req.body.pass );
})

app.listen(8080,()=>{console.log("server started")})
