var db=require("./database")
var bcrypt=require("bcrypt")

module.exports=(req,res)=>{


	var merc_name=req.body.username;
	//console.log(username)
	var email=req.body.email;
	var password=req.body.password;

	var sql1="select * from merchants where email='"+email+"'";
 	db.query(sql1,(error,results)=>{
 		if(results.length>0){
 			console.log("email already registered");
 			res.send("email already registered")
 			
 		}
		else{
		 		bcrypt.hash(password,10,(err,hash)=>{
				var sql="insert into merchants values('"+merc_name+"','"+email+"','"+hash+"')";
				db.query(sql,(error,results)=>{
					if(error)
						console.log(error);
					else
						{//console.log(password);
						console.log("merchants registered");
						res.send("merchants registered")
						
					}
				})
				})
 		}
 	})
}