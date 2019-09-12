var db=require("./database")
var bcrypt=require("bcrypt")
module.exports=(req,res)=>{
	//var type=document.querySelector('input[name = "type"]:checked').value;
	var type=req.body.type;
	var email="namyasinha@gmail.com";
	var card_number=req.body.card_number;
	var holder_name=req.body.holder_name;
	var cvv=req.body.cvv;
	//console.log(cvv)

	
		
				var sql="insert into cards(type,card_number,holder_name,cvv,email) values('"+type+"','"+card_number+"','"+holder_name+"','"+cvv+"','"+email+"')";
				db.query(sql,(error,results)=>{
					if(error)
						console.log(error);
					else
						{//console.log(password);
						console.log("card details added");
						res.send("card details added")
						
					}
				})
		
			
}