import { race } from "../../../Library/Caches/typescript/2.6/node_modules/@types/async";

const express = require("express");
const mongodb = require('mongodb');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const database = "nodeData"

app.use(cors())
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect(url+'/'+database);
var db = mongoose.connection;


var userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
      },
    age: {
        type: Number,
        required: true
      },
    mentor:{
        type: Mentor,
        ref:Mentor
    }

});

var User = db.model('User',userSchema);



app.post("/students",(req,res)=>{ 
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age
    user.save(function(err,doc){
        res.json(doc);
    });
    
})

app.get("/students",(req,res)=>{ 
    let name = req.query.user
     db.collection('users').find({"name":name}).toArray(function(err,docs){
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
