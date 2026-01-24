// Express middleware

const express=require("express");

const app=express();

const users=require("./MOCK_DATA.json");

const PORT=8080;

app.use(express.urlencoded({extended:false}));

app.use((req, res, next)=>{

    console.log("Hello, from middleware 01");
    
    next();
});

app.use((req, res, next)=>{

    console.log("Hello, from middleware 02");

    next();
});

app.get("/users",(req, res)=>{

    const html=`
   <ul>
   ${users.map(user=>`<li>${user.first_name}</li>`).join("")}
   </ul>
    `;

    return res.send(html);
});

app.listen(PORT, ()=>console.log("Server started on PORT ", PORT));
