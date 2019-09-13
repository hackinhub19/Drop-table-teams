var express=require("express")
var bodyParser =require("body-parser")
var mysql=require("mysql")
var session=require("express-session")
//var js_sha512=require("js-sha512")
var bcrypt=require("bcrypt")
var db=require("./routes/database")

var ejs=require("ejs")
var fetch=require("node-fetch")
var app=express() ;
const path = require('path');
// var fs = require('fs');
 app.use(bodyParser.json())
 app.use(bodyParser.urlencoded({ extended: false }))
 app.set('view engine','ejs');
 app.set('views', path.dirname(__dirname)+'/LOGIN_V13/views');
//app.use('/static', express.static(path.dirname(__dirname)+'/LOGIN_V13/public'))
app.use(express.static(path.dirname(__dirname)+'/LOGIN_V13/public'));
app.use(express.static(path.dirname(__dirname)+'/LOGIN_V13/views'));

// app.use(express.static(path.dirname(__dirname)+'/LOGIN_V13/bow/public'));


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

/*app.get("/",(req,res)=>{
	
	//res.end("login register page")
	res.sendFile(path.dirname(__dirname)+'/LOGIN_V13/register.html');
})
*/
var test=require("./routes/route.js")
app.route("/test").post(test)
app.get("/test",(req,res)=>{
	res.sendFile(__dirname+'/public/app/view/main.html')
})
//customer registration
var cust_register=require("./routes/cust_register")
app.route("/cust_register").post(cust_register)
app.get("/cust_register",(req,res)=>{
	res.sendFile(path.dirname(__dirname)+'/LOGIN_V13/register.html')
})
//merchants registration
var merc_register=require("./routes/merc_register")
app.route("/merc_register").post(merc_register)

//customer login
var login=require("./routes/login")
app.route("/login").post(login)
app.get("/login",(req,res)=>{
	res.sendFile(path.dirname(__dirname)+'/LOGIN_V13/login.html')
})
//dashboard
app.get("/dashboard",(req,res)=>{
	res.sendFile(path.dirname(__dirname)+'/LOGIN_V13/index.html')
})

app.get("/transaction",(req,res)=>{
	res.sendFile(path.dirname(__dirname)+'/LOGIN_V13/transactions.html')
})
/*app.get("/payment",(req,res)=>{
	res.sendFile(path.dirname(__dirname)+'/LOGIN_V13/payment_modes.html')
})
*/




//cards details
var cards=require("./routes/cards")
app.route("/cards_add").post(cards)
app.get("/cards_add",(req,res)=>{
res.sendFile(path.dirname(__dirname)+'/LOGIN_V13/cards_add.html')	
});
//update cards
var update =require("./routes/update")
app.route("/update/:id").post(update)

//delete cards
app.get('/delete/:id',(req,res)=>{
	db.query("delete from cards where id='"+req.params.id+"'",(err,results)=>{
		console.log("row deleted with id "+req.params.id)
	})
})

app.get('/payment',(req,res)=>{
	var email="namyasinha@gmail.com";
	var sql="select * from cards where email='"+email+"'"
	db.query(sql,(error,results)=>{
		console.log(results)
		res.render('cards',{
			cards:results
		})
	})
})


function interval(){
	fetch("https://api.thingspeak.com/channels/862673/fields/1.json?api_key=Z7GJYT6JDZ8C6IA1&results=2")
	.then(
		function(response){
			response.json().then(function(data){
				//var email=req.session.email||"namyasinha2@gmail.com";
				//var rfid=data.channel.id;
				//var field1=data.feeds[0].field1;

				//console.log("hi")
				var field1=data.feeds[1].field1;
				//console.log(field1);
				var created_at=data.feeds[1].created_at;
				//console.log(created_at)
				var email="namyasinha2@gmail.com";
				var sql="SELECT field1 as field_table FROM transactions ORDER BY id DESC LIMIT 1;";
				 db.query(sql,(err,results)=>{
				 	//console.log(results[0])
				 	if(results.length==0||results[0].field_table!=field1)
				 		{   
				 			//response.sendfile(__dirname+"/app/view/main.html")
				 			//return response.redirect('/app/view/main.html')
				 			var sql2="insert into transactions(field1,created_at,email) values('"+field1+"','"+created_at+"','"+email+"')";
				 	        db.query(sql2,(err,results)=>{
				 	        if(err)console.log(err)
				 	        else
				 	     	console.log("entered")
				 	     })
				 	     
				        }





				 })


				
			})
		}
		)
	.catch(function(err){
		console.log(err)
	})

}
setInterval(interval,5000);

 app.listen(3000,()=>{
 	console.log("Server started at port 3000")
 })