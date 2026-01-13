const fs=require("fs");

// Synchronous.....
//fs.writeFileSync("./test.txt","Hello there");

//Asynchronous
fs.writeFile("./test2.txt","Hello dude",(err)=>{});