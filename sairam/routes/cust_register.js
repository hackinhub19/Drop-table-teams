var db=require("./database")
var bcrypt=require("bcrypt")

module.exports=(req,res)=>{


	var username=req.body.username;
	console.log(username)
	var email=req.body.email;
	var password=req.body.password;

	var sql1="select * from users where email='"+email+"'";
 	db.query(sql1,(error,results)=>{
 		if(results.length>0){
 			console.log("email already registered");
 			res.send("email already registered")
 			
 		}
		else{
		 		bcrypt.hash(password,10,(err,hash)=>{
				var sql="insert into users values('"+username+"','"+email+"','"+hash+"')";
				db.query(sql,(error,results)=>{
					if(error)
						console.log(error);
					else
						{//console.log(password);
						console.log("customer registered");
						res.send("customer registered")
						
					}
				})
				})
 		}
 	})
}