    const express=require('express');
    const mongoose=require('mongoose');
    const cors=require('cors');
    const app=express();
    app.use(express.json());
    app.use(cors());

    // let todos=[]; 

     mongoose.connect('mongodb://localhost:27017/mern-app').then
     (()=>{
        console.log('connected with mongodb');
     })
     .catch((err)=>{
        console.log(err);
     })

const todoschema=new mongoose.Schema({
    title:{
        required:true,
        type:String
    },
    description:String
})

const todomodel= mongoose.model('todo',todoschema);

    app.post('/todos',async(req,res)=>{
        const {title,description}=req.body;

//         const newtodo={
//             id:todos.length+1,
//             title,
//             description

//         }; 
//  todos.push(newtodo);
try{
const newtodo = new todomodel({title,description});

await newtodo.save();
res.status(201).json(newtodo);
console.log(newtodo);
}
catch (error){
console.log(error);
 res.status(500).json({ error: 'Internal Server Error' }); 

}
// console.log(todos);

// res.status(201).json(newtodo);

    })

   app.get('/todos', async (req, res) => {
    try {
        const gettodo = await todomodel.find();
        res.json(gettodo);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.put('/todos/:id',async(req,res)=>{

    try{
        const {title,description}=req.body;
        const id=req.params.id;
    const updatetodo=await todomodel.findByIdAndUpdate(
        id,
        { title,description},
        {new:true}
    )
    if(!updatetodo)
    {
        return res.status(404).json({message:'message not found'});
    }
     res.status(200).json(updatetodo);
}
catch(error)
{
console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
}
})


 app.delete('/todos/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const deletetodo = await todomodel.findByIdAndDelete(id);

        if (!deletetodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


    const port=3000;

    app.listen(port,()=>{
        console.log("working")
    })