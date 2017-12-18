const express = require("express");

const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan')


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(morgan('combined'));

app.post("/",(req,res)=>{ 
    console.log(req.body.name);
    res.send("<h1>Hello</h1>");
})

app.get("/login",(req,res)=>{ 
    console.log(req.body);
    res.send("<form>Username<input type='text'></form>");
})



app.listen(8080,()=>{console.log("server started")})
