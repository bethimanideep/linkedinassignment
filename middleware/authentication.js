const { model } = require("../configs/db")
const bcrypt = require("bcrypt")
const token=async(req,res,next)=>{
    
}
const verify=async(req,res,next)=>{
    let name = req.body.name
    let data = req.body
    let password = req.body.password
    let current = await model.findOne({ name })
    if (current == null) {
        let hash = bcrypt.hashSync(password, 5)
        data.password = hash
        next()
    }else{
        res.json("User already exist, please login")
    }
}
module.exports={
    token,
    verify
}