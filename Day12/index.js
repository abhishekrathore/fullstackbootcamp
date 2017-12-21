
const express = require("express");
const mongodb = require('mongodb');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://localhost:27017";
const database = "nodeData"
const session = require('express-session');

app.use(cors())
app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000 }}))

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
      }


});

var User = db.model('User',userSchema);



app.post("/students",(req,res)=>{ 
    var user = new User();
    user.name = req.body.name;
    user.age = req.body.age
    user.save(function(err,doc){
        if(err) throw err;
        res.json(doc);
        req.session.name = doc.name
        req.session.age = doc.age

    });
    
})

app.get("/students",(req,res)=>{ 
    console.log(req.session.id);
    let name = req.query.user
    // User.find({},'age name',function(err,doc){
    //    res.json(doc)
    // })
    res.json([{name:req.session.name,age:req.session.age}])
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
