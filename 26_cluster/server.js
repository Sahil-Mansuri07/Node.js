const cluster=require("cluster");
const express=require("express");
const os=require("os");
const totalCPUs=os.cpus().length;

console.log("Total CPU is: ",totalCPUs);

if (cluster.isPrimary) {
    cluster.fork();
} else {
    const app=express();
    const PORT=8000;

    app.get("/",(req, res)=>{
       return res.json({message:`Hello from Express server ${process.pid}`});
    });

    app.listen(PORT,()=>console.log(`Server started at PORT: ${PORT}`));
}