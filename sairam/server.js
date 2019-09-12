var express=require("express")
var bodyParser =require("body-parser")
var mysql=require("mysql")
var session=require("express-session")
var bcrypt=require("bcrypt")
var db=require("./routes/database")
var app=express() ;
const path = require('path');
// var fs = require('fs');
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))
// app.use('/static', express.static(path.dirname(__dirname)+'/LOGIN_V13/public'))


app.use(function(req, res, next) {
	res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();

});
app.use(session({secret:"hackathonfinal", saveUninitialized:true, resave:true}))
//session

var auth=function(req,res,next){
	
	if(req.session.loggedIn){
		next();
	}
	else{
		res.redirect("/")
	}
}

app.get("/",(req,res)=>{
	
	//res.end("login register page")
	res.sendFile(path.dirname(__dirname)+'/LOGIN_V13/register.html');
})
//customer registration
var cust_register=require("./routes/cust_register")
app.route("/cust_register").post(cust_register)
//merchants registration
var merc_register=require("./routes/merc_register")
app.route("/merc_register").post(merc_register)

//customer login
var login=require("./routes/login")
app.route("/login").post(login)

//cards details
var cards=require("./routes/cards")
app.route("/cards").post(cards)
//update cards
var update =require("./routes/update")
app.route("/update/:id").post(update)
//delete cards
app.get('/delete/:id',(req,res)=>{
	db.query("delete from cards where id='"+req.params.id+"'",(err,results)=>{
		console.log("row deleted with id "+req.params.id)
	})
})

 app.listen(3000,()=>{
 	console.log("Server started at port 3000")
 })