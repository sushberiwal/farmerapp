const express = require ("express")
const app = express();
var cookieParser = require('cookie-parser')
const userRouter= require("./routers/userRouter");
const cropsRouter = require("./routers/cropsRouter");
const viewRouter= require("./routers/viewRouter")
app.use(express.static("public"))
//dyanamic files =>views folder
app.set("view engine","pug")
app.set("views","views")
app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))
app.use("",viewRouter)
app.use("/api/user", userRouter);
app.use("/api/crops", cropsRouter);
// app.use(express.static("public"))
app.listen(3000,()=>
{
    console.log("Server is listening at port 3000")
})