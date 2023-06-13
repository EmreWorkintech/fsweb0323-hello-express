const express = require('express');
const router = express.Router();
const racesRouter = require('../races/races-router');

let id = 0;
function getId() {
    return ++id;
} 

let hobbits = [
    {id: getId(), name: "Frodo"},
    {id: getId(), name: "Sam"},
    {id: getId(), name: "Merry"},
]

router.use('/races', racesRouter);

//CRUD Operations

//Create  -POST
router.post('/', (req,res)=>{
    const newHobbit = {
        id: getId(),  //req.body.data.id
        name: req.body.name
    }
    hobbits.push(newHobbit);
    const createdHobbit = hobbits[hobbits.length-1];
    res.status(201).json(createdHobbit);
})

//Read
router.get('/', (req,res)=>{
    const fieldName = req.query.sortBy || 'name';  //route params olarak alma {sortby: "id", dir: "dec", per_page: "3"}
    const orderedHobbits = hobbits.sort((a,b)=> a[fieldName]<b[fieldName] ? -1: 1);
    res.json(orderedHobbits)
})

//Update  -PUT
router.put('/:id', (req,res)=>{
    
    let hobbit = hobbits.find(item=>item.id == req.params.id)

    if(hobbit){
        hobbit.name = req.body.name;
        res.json({message: `${req.params.id} id'li kullanıcı güncellendi...`})
    } else {
        res.status(404).json({message: `${req.params.id} id'li kullanıcı bulunamadı!..`})
    }
    
})

//Delete -Delete
router.delete('/:id/:name/:surname', (req,res)=>{
    const { id, name, surname } = req.params; //route params olarak alma {id: 5, name: "Emre", surname: "Sahiner"}

    let hobbit = hobbits.find(item=>item.id == id)

    if(hobbit){
        hobbits = hobbits.reduce((acc,item)=>{
            if(item.id == id){
                return acc;
            } else {
                acc.push(item);
                return acc
            }
        },[])

        res.json({message: `${id} id'li kullanıcı silindi...`})
    } else {
        res.status(404).json({message: `${id} id'li kullanıcı bulunamadı!..`})
    }

})

//bonus
router.post('/delete/selected', (req,res)=>{

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

module.exports = router;