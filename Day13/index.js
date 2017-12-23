
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
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

app.use(cors())
app.use(session(
    { secret: 'keyboard cat',
    resave : true,
  cookie: { maxAge: 600000 }}))
  app.use(passport.initialize());
  app.use(passport.session());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
 
var users = []
var uid= 0;

passport.use(new LocalStrategy(
    function(username, password, done) {

        console.log(username,password)
    //   User.findOne({ username: username }, function (err, user) {
    //     if (err) { return done(err); }
    //     if (!user) {
    //       return done(null, false, { message: 'Incorrect username.' });
    //     }
    //     if (!user.validPassword(password)) {
    //       return done(null, false, { message: 'Incorrect password.' });
    //     }
    //     return done(null, user);
    //   });
    var u = {username:username,password:password,id:uid++}
    users.push(u)
    done(null,u)
    }
  ));

  passport.use(new FacebookStrategy({
    clientID: 338118299934377,
    clientSecret: "ac01c7bfafc8009c6ff3f78c5ae7bc94",
    callbackURL: "http://localhost:8080/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, cb) {
    users.push(profile)
    console.log(profile)
    cb(null,profile)
    
  }
));



  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(function(id, done) {
    for(var i=0;i<users.length;i++){
        if(id==users[i].id){
            done(null, users[i]);
        }
    } 
    
  });



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
        req.session.save();

    });
    
})

app.get("/students",isAuthenticated,
  (req,res)=>{ 
    console.log(req.session.id);
    console.log(req.session);
    console.log(req.user);


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

app.post('/login',
  passport.authenticate('local'),
  function(req, res) {
    console.log(req.session.id);
    console.log(req.session);
    console.log(req.user);
    res.send("authenticated");
  });

  app.get('/fblogin',
  passport.authenticate('facebook'),
  function(req, res) {
    console.log(req.session.id);
    console.log(req.session);
    console.log(req.user);
    res.send("authenticated");
  });

app.listen(8080,()=>{console.log("server started")})
function isAuthenticated(req,res,done){
 if(req.user){
     done(null)
 }else{
     res.send("Not Logged in")
 }

}