import express from 'express';

const app = express();
const port = 3000;
app.use(express.json())

let data = []
let nextId = 1

app.get("/", (req,res)=>{
    res.send("hello")
})

app.get("/dev", (req,res)=>{
    res.send ("deveploer says hello")
})

app.post("/add", (req,res)=>{
    const {name,price}=req.body
    const newItem = {
        id: nextId++,
        name,
        price
    }
    data.push(newItem);
    res.status(201).send(newItem)
})

app.get("/get", (req,res)=>{
    res.status(200).send(data)
})

app.get("/get/:id", (req,res)=>{
    const item = data.find(i=>i.id===parseInt(req.params.id))
    
    if(!item){
        return res.status(404).send("item not found")
    }
    res.status(200).send(item)
})

app.put("/update/:id", (req,res)=>{
    const item = data.find(i=>i.id===parseInt(req.params.id))
    
    if(!item){
        return res.status(404).send("item not found")
    }
    const {name,price} = req.body
    item.name = name
    item.price = price
    res.status(200).send(item)
})

app.delete("/delete/:id", (req,res)=>{
    const index = data.findIndex(i=>i.id===parseInt(req.params.id))
    
    if(index===-1){
        return res.status(404).send("item not found")
    }
    data.splice(index,1)

    res.status(200).send(data)
})


 
app.listen(port,()=>{
    console.log(`server is running on path 127.0.0.1:${port}`);
})