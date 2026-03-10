const express=require('express')
const app=express();
require('dotenv').config()
const cors=require('cors');
const connectDb = require('./src/dbconnection/dbConnection');
const authRoute=require('./src/routes/AuthRoute')


app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    withCredentials:true,
    methods:["GET","POST","PUT","DELETE"],
    
    
}));

connectDb();

app.use("/api/auth",authRoute)

const PORT=process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`SERVER IS RUNNING ON PORT ${PORT}`)
})