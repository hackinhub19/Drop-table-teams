var db=require("./database")
var bcrypt=require("bcrypt")
module.exports=(req,res)=>{
	var email=req.body.email;
	var password=req.body.password;

	var sql="select * from user where email='"+email+"'";
	db.query(sql,(error,results)=>{
		if(results.length>0)
		{ 
			var hash=results[0].password;
			//console.log(hash);
			bcrypt.compare(password,hash).then(function(response){
				if(response==true)
					{
					  console.log("logged in");
					  res.send("logged in")
				      req.session.loggedIn=true;
				      req.session.email=email;
				      }
				    
				else
					{console.log("wrong credentials");
						res.send("wrong credentials")

					}
			})
		}
		else
			{console.log("no email registered");
				res.send("no email registered")
			}
	})
}