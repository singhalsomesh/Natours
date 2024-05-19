const fs = require('fs');

const readUsers = fs.readFileSync(`${__dirname}/../dev-data/data/users.json`,'utf-8');
const users = JSON.parse(readUsers)

exports.getAllUsers = (req,res)=>{
    res.status(201).json({
        status:'success',
        requestTime : req.requestTime,
        message:'Tours fetch successfully',
        data : {
            users
        }
    })
} 

exports.getUser = (req,res)=>{
    
    const user = users.find(user => user.id === req.params.id * 1);
    if(!user){
        return res.status(404).json({
            status:'Failed',
            message : "User not found with id:"+req.params.id
        })
    }
    res.status(200).json({
        status : "success",
        data : {
            user
        }
    })
}

exports.updateUser = (req,res)=>{
    
    const user = users.find(user => user.id === req.params.id * 1);
    if(!user){
        return res.status(404).json({
            status:'Failed',
            message : "User not found with id:"+req.params.id
        })
    }
    res.status(200).json({
        status : "success",
        data: "updated data"
    })
}

exports.deleteUser = (req,res)=>{
    
    const user = users.find(user => user.id === req.params.id * 1);
    if(!user){
        return res.status(404).json({
            status:'Failed',
            message : "User not found with id:"+req.params.id
        })
    }
    res.status(200).json({
        status : "success",
        data: "deleted data"
    })
}

exports.createUser = (req,res) => {
    // console.log(req.body);
    const newId = users[users.length - 1].id + 1;
    const newUser = Object.assign({id:newId},req.body)
    tours.push(newUser);
    fs.writeFile(`${__dirname}/dev-data/data/users.json`,JSON.stringify(users),err => {
         res.status(201).json({
             message:"user added successfully",
             data:{
                 tour : newTour
             }
         })
    })
 }