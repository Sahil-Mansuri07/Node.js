// Building HTTP Server in Node.js

const http=require("http");

const fs=require("fs");

const myServer=http.createServer((req, res)=>{

    const log=`${Date.now()}: New Request is Recieved\n`;

    fs.appendFile("log.txt",log,(err, data)=>{

        switch(req.url){

            case "/":
                res.end("Home Page");
                break;
            case "/about":
                res.end("Hello, My name is Sahil Mansuri");
                break;
            default:
                res.end("404 Not Found");
             
        }

    });

});

myServer.listen(8000,()=>{
    console.log("Server started");
})