const express = require("express")
const app=express()
app.use(express.json())

let initialTodo = [{title:"html",isCompleted:true,id:1},{title:"javascript",isCompleted:true,id:2},{title:"React",isCompleted:false,id:3}]
 app.get("/",(req,res)=>{
    res.status(200).send("welcome to the todo api")
 });
 app.get("/todos",(req,res)=>{
    res.status(200).send(initialTodo)
});
app.post("/addtodo",(req,res)=>{
    const todos = {title :req.body.title, isCompleted: req.body.isCompleted, id:initialTodo.length+1 }
    // console.log(req.body);
    initialTodo.push(todos)
   res.status(200).send(todos)
});
app.patch("/update/:id",(req,res)=>{
    let {id} = req.params
    console.log(id);
    let updatedTodo = initialTodo.filter(todo=>todo.id == id)
    console.log(updatedTodo);
    updatedTodo[0].title=req.body.title
    updatedTodo[0].isCompleted=req.body.isCompleted
    res.status(200).send(...updatedTodo)
})
app.delete("/delete/:id",(req,res)=>{
    let {id} = req.params
    let index = initialTodo.findIndex(todo=>todo.id == id)
    let deletedtodo = initialTodo.splice(index,1)[0]
    res.status(200).send({deletedtodo, initialTodo})
})
app.get("/todo/:id",(req,res)=>{
    let {id}= req.params
    let todo = initialTodo.filter(todo=>todo.id==id)
    console.log(todo);
    res.status(200).send(todo)
})
app.get("/findbystatus",(req,res)=>{
    let isCompleted = req.query.isCompleted
    if(isCompleted === "true"){
        completedtodos = initialTodo.filter(todo=>todo.isCompleted===true)
        res.send(completedtodos)
    }
    else if(isCompleted === "false"){
        let notCompletedtodos = initialTodo.filter(todo=>todo.isCompleted === false)
        res.send(notCompletedtodos)
    }
    else{
        res.send("Invalid")
    }
})

 app.listen(8090,()=>{
    console.log("Server Started");
 })