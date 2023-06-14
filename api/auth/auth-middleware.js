let users = []

const restricted = (req,res,next)=>{
    if(users.length>0){
        next()
    } else {
        next({status:403, message: "Please, login first!..."})
    }
}

const passwordCheck = (req,res,next)=>{
    if(req.body.password && 
        req.body.password.trim().length > 3 
        &&req.body.password=="1234"){
        req.user.name = req.body.name;
        users.push(req.body.name);
        next()
    } else {
        next({message: "password required!..."})
    }
}

const nameCheck = (req,res,next)=>{
    if(req.body.name && 
        req.body.name.trim().length > 3){
        next()
    } else {
        next({status: 400, message: "name required and mut be at least 3 chars!..."})
    }
}

module.exports = { 
    passwordCheck,
    nameCheck,
    restricted,
    users,
 }