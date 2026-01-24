
const express = require("express");

const fs=require("fs");

const users = require("./MOCK_DATA.json")

const app = express();

app.use(express.urlencoded({extended:false}));

const PORT = 8000;

//Routes
app.get('/users', (req, res)=>{
    const html = `
    <ul>
    ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    <ul>
    `
    res.send(html)
})

//REST Api

app.get('/api/users', (req, res)=>{
    return res.json(users);
})

// app.route('/api/users/:id').get((req, res)=>{
    
//     const id = Number(req.params.id);
//     const user = users.find(user => user.id === id);
//     return res.json(user);

// })
// .patch((req, res) =>{
//     // TODO : edit the user with id
//     return res.json({status : 'Pending'})
// })
// .delete((req , res)=>{
//     // TODO : delete the user with id
//     res.json({status : 'Pending'})
// })



app.post('/api/users' , (req , res)=>{
    // TODO : Create new user

    const body=req.body;

    users.push({id: users.length+1, ...body});

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{

        return res.json({status: "SUCCESS",id:users.length});

    });

})


app.patch('/api/users/:id' , (req , res)=>{
    // TODO : Edit the user with id

    const id=Number(req.params.id);

    const user=users.find((user)=>{user.id===id});

    const body=req.body;

    users.patch({...body});

    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data)=>{

        return res.json({status: "SUCCESS",id:users.length});

    });

    return res.json({status: "pending"});


});



app.delete('/api/users/:id' , (req , res)=>{
    // TODO : delete the user with id

    const id=Number(req.params.id);

    const user=users.find((user)=>{user.id===id});
    
    users.delete(user);

    return res.json({status: "Deleted",id:id});
})

app.listen(PORT , ()=>{
    console.log(`Server started at Port ${PORT}`)
})
