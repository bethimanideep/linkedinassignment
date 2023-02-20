const express = require("express")
const router = express.Router()
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const { verify } = require("../middleware/authentication")
const { model } = require("../configs/db")
require("dotenv").config()
router.use(express.json())
router.post("/users/register", verify, async (req, res) => {
    let data = req.body
    let user = new model(data)
    await user.save()
    res.json("success")
})
router.post("/users/login", async (req, res) => {
    let name = req.body.name
    let current = await model.findOne({ name })
    if (current == null) {
        res.json("notfound")
    } else if (req.body.password) {
        bcrypt.compare(req.body.password, current.password, (err, decoded) => {
            if (decoded) {
                let token = jwt.sign({ name }, process.env.secretkey,{expiresIn:"1h"})
                res.json(name)
            } else {
                res.json("passwordwrong")
            }
        })
    }
})
router.post("/users/addpost",async(req,res)=>{
    let name=req.body.name
    let current = await model.findOne({ name })
    if(current){
        current.posts.push(req.body)
        let c=await model.findOneAndUpdate({name},{posts:current.posts})
        res.json("postadded")
    }
     
})
router.post("/users/posts",async(req,res)=>{
    let name=req.body.name
    let current = await model.findOne({ name })
    if(current){
        res.json(current.posts)
        console.log(current.posts);
    }
})
router.get("/posts/top",async(req,res)=>{
    let data=await model.find()
    res.json()
})
router.post("/posts/update",async(req,res)=>{
    let data=await model.find()
    res.json()
})
router.post("/posts/delete",async(req,res)=>{
    let name=req.body.name
    let data=await model.findOneAndDelete({name})
    res.json("deleted")
})
module.exports = {
    router
}