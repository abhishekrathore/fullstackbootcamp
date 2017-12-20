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



app.post("/students",(req,res)=>{ 
    // let name = req.body.name
    // let age = req.body.age
    db.collection('students').insertOne(req.body,function(err,doc){
       console.log(err,doc)
       res.json(doc)
    })
})

app.get("/students",(req,res)=>{ 
    let name = req.query.user
     db.collection('students').find({"name":name}).toArray(function(err,docs){
         if(docs.length){
             res.json(docs)
         }else{
             res.json({err:true,msg:"no user found"})
         }
     })
 })

 app.get("/deleteStudents",(req,res)=>{ 
    let name = req.query.user
     db.collection('students').deleteOne({"name":name},function(err,doc){
         res.json(doc)
     })
 })

app.post("/submit",(req,res)=>{
    res.send("hi"+req.body.username+" your pass is "+req.body.pass );
})

app.listen(8080,()=>{console.log("server started")})
