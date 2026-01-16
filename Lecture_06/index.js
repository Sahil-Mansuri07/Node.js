// Handling URL's in Node.js

const http=require("http");
const fs=require("fs");
const url=require("url");

const myServer=http.createServer((req, res)=>{

    if(req.url==="/favicon.ico") return res.end();

    const log=`${Date.now()}: New Request Recieved`;

    const myUrl=url.parse(req.url,true);

    fs.appendFile("log.txt",log,(err,data)=>{

        switch(myUrl.pathname){

            case "/":
                res.end("Home Page");
                break;
            case "/about":
                const username=myUrl.query.myname;
                res.end(`Hii, ${username}`);
                break;    
            case "/search":
                const search=myUrl.query.search_query;
                res.end("Here are your result for " +search);
                break;
            default:
                res.end("404 Not Found");                 

        }     
    });
    
});

myServer.listen(8000,()=>{console.log("Server starting....")});