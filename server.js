const express = require("express")
const app = express()
const dotenv = require("dotenv").config()
const port = process.env.PORT || 5001;
const errorHandler = require("./middleware/errorHandler");
const connectDb = require("./config/dbCinnection");

connectDb()
app.use(express.urlencoded({ extended: true }));

app.use(express.json())
app.use("/api/contacts" , require("./routes/contactRoutes"))
app.use("/api/users" , require("./routes/userRoutes"))
app.use(errorHandler)
 

app.listen(port, (req,res)=>{
    console.log(`Listining on port number ${port}`); 
})
