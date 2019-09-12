var mysql=require("mysql")

var connection = mysql.createConnection({
	multipleStatements: true,
    host:"localhost",
    user:"root",
    password:"",
    database:"hackinhub",

})

connection.connect((err)=>{
    if(err)
    console.log(err);
    else
    console.log("Database connected...")
})

module.exports=connection;
