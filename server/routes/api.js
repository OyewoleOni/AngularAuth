const express = require('express')

const router =express.Router()
const User =require('../models/user')

const mongoose = require('mongoose')
const dbConnStr= "mongodb://OyewoleOni:OPENsesami1910@ds155352.mlab.com:55352/eventsbd"

mongoose.connect(dbConnStr,err =>{
    if(err){
        console.error('Error!'+ err)
    }else{
        console.log('connected to mongodb')
    }
});
router.get('/',(req,res) =>  {
    res.send('From API Route')
})

router.post('/register', (req,res)=>{
    let  userData = req.body
    let user = new User(userData)
    user.save((error, registeredUser)=>{
        if(error) {
            console.log(error)
        } else{
            res.status(200).send(registeredUser)
        }

    })
})

router.post('/login',(req,res)=>{
    let loginData= req.body

    User.findOne({email: loginData.email}, (error,user)=>{
        if(error){
            console.log(error)
        }else{
            if(!user){
                res.status(401).send('invalid email')
            }else 
            if(user.password !== loginData.password){
                res.status(401).send('invalid password')
            }else{
                res.status(200).send(user)
            }
        }
    })
})

router.get('/events',(req,res)=>{
    let  events=
    [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
    ]
    res.json(events)
})

router.get('/special',(req,res)=>{
    let  events=
    [
        {
            "_id":"1",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
        {
            "_id":"2",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
        {
            "_id":"3",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
        {
            "_id":"4",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
    ]
    res.json(events)
})

module.exports=router