const express = require('express');
const router = express.Router();

let id = 0;
function getId() {
    return ++id;
} 

let races = [
    {id: getId(), name: "Human"},
    {id: getId(), name: "Dwarf"},
    {id: getId(), name: "Elf"},
]


router.get('/', (req,res)=>{
    const fieldName = req.query.sortBy || 'name';  //route params olarak alma {sortby: "id", dir: "dec", per_page: "3"}
    const orderedRaces = races.sort((a,b)=> a[fieldName]<b[fieldName] ? -1: 1);
    res.json(orderedRaces)
})


module.exports = router;