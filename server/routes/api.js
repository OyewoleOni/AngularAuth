const express = require('express')
const jwt = require('jsonwebtoken')
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

function verifyToken(req, res,next){
    if(!req.headers.authorization){
        return res.status(401).send('Unauthorized request')
    }
    let token = req.headers.authorization.split(' ')[1]

    if(token ==='null'){
        return res.status(401).send('Unauthorized request')
    }
    let payLoad=jwt.verify(token,'secretKey')
    if(!payLoad){
        return res.status(401).send('Unauthorized request')
    }
    if(!payLoad){
        return 
    }
    req.userId = payLoad.subject
    next()
}
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
            let payLoad = {subject: registeredUser._id}
            let tokken=jwt.sign(payLoad, 'secretKey')
            //res.status(200).send(registeredUser)
            res.status(200).send({tokken})
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
                let payLoad = {subject: user._id}
                let token = jwt.sign(payLoad, 'secretKey')
                //res.status(200).send(user)
                res.status(200).send({token})
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
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
        {
            "_id":"6",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
    ]
    res.json(events)
})

router.get('/special',verifyToken,(req,res)=>{
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
        {
            "_id":"5",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
        {
            "_id":"6",
            "name":"Auto Expo",
            "description":"lorem ipsum",
            "date":"2018-09-23T18:15:43.511z"
        },
    ]
    res.json(events)
})

module.exports=router