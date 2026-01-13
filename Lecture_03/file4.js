const fs=require("fs");

// How to copy a file ?
//fs.cpSync("./test.txt","./copy.txt");

// How to delete a file ?
//fs.unlinkSync("./copy.txt");

// How to know file details ?

console.log(fs.statSync("./test.txt"));