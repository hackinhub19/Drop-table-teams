var db=require("./database")

module.exports=(req,res)=>{
	var type=req.body.type;
	var email="namyasinha@gmail.com";
	var card_number=req.body.card_number;
	var holder_name=req.body.holder_name;
	var cvv=req.body.cvv;

	var sql2="update cards set type='"+type+"',email='"+email+"',card_number='"+card_number+"',holder_name='"+holder_name+"',cvv='"+cvv+"' where id='"+req.params.id+"'";
	db.query(sql2,(err,results)=>{
		if(err) console.log(err)
		else{
			console.log("updated row with id "+req.params.id)
		}
	}) 
}