const express = require ("express")
const app = express();
const farmerRouter= require("./routers/farmerRouter");
const buyerRouter = require("./routers/buyerRouter");
const cropsRouter = require("./routers/cropsRouter");


app.use(express.json())

app.use("/api/farmer", farmerRouter);

app.use("/api/buyer",buyerRouter);

app.use("/api/crops", cropsRouter);


app.listen(3000,()=>
{
    console.log("Server is listening at port 3000")
})