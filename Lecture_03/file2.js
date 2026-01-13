const fs=require("fs");

// Sync.....
const result=fs.readFileSync("./test.txt","utf-8");

console.log(result);

//Async.....
fs.readFile("./test2.txt","utf-8",(err,result)=>{

if(err)
{
    console.log("Error",err);
}

else{
    console.log(result);
}

});