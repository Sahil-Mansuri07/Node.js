// Blocking operations.

const fs=require("fs");

console.log("1")

// Blocking/Synch...
const result=fs.readFileSync("./test2.txt","utf-8");
console.log(result);

console.log("2");

console.log("3");
