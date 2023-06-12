const express = require('express');
const server = express();

let id = 0;
function getId() {
    return ++id;
} 

let hobbits = [
    {id: getId(), name: "Frodo"},
    {id: getId(), name: "Merry"},
    {id: getId(), name: "Sam"},
]


server.use(express.json());  //buna şimdilik takılmayalım...

//CRUD Operations

//Create  -POST
server.post('/', (req,res)=>{
    const newHobbit = {
        id: getId(),
        name: req.body.name
    }
    hobbits.push(newHobbit);
    const createdHobbit = hobbits[hobbits.length-1];
    res.status(201).json(createdHobbit);
})

//Read
server.get('/', (req,res)=>{
    res.json(hobbits)
})

//Update  -PUT
server.put('/:id', (req,res)=>{
    
    let hobbit = hobbits.find(item=>item.id == req.params.id)

    if(hobbit){
        hobbit.name = req.body.name;
        res.json({message: `${req.params.id} id'li kullanıcı güncellendi...`})
    } else {
        res.status(404).json({message: `${req.params.id} id'li kullanıcı bulunamadı!..`})
    }
    
})

//Delete -Delete
server.delete('/:id', (req,res)=>{

    let hobbit = hobbits.find(item=>item.id == req.params.id)

    if(hobbit){
        hobbits = hobbits.reduce((acc,item)=>{
            if(item.id == req.params.id){
                return acc;
            } else {
                acc.push(item);
                return acc
            }
        },[])

        res.json({message: `${req.params.id} id'li kullanıcı silindi...`})
    } else {
        res.status(404).json({message: `${req.params.id} id'li kullanıcı bulunamadı!..`})
    }

})

server.post('/delete/hobbits', (req,res)=>{

    //toplu silme olsa nasıl olurdu?
    const hobbitsToDelete = req.body.hobbits;

    if(hobbit){
        hobbits = hobbits.reduce((acc,item)=>{
            if(hobbitsToDelete.includes(item.id)){
                return acc;
            } else {
                acc.push(item);
                return acc
            }
        },[])

        res.json({message: `${req.params.id} id'li kullanıcı silindi...`})
    } else {
        res.status(404).json({message: `${req.params.id} id'li kullanıcı bulunamadı!..`})
    }
    const newHobbit = {
        id: getId(),
        name: req.body.name
    }
    hobbits.push(newHobbit);
    const createdHobbit = hobbits[hobbits.length-1];
    res.status(201).json(createdHobbit);
})

module.exports = server;