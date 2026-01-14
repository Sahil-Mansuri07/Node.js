// Non-Blocking operations.

const fs=require("fs");

console.log("1")

// Non-Blocking/Asynch...
const result=fs.readFile("./test2.txt","utf-8",(err,result)=>{
    console.log(result);
});

console.log("2");

console.log("3");
