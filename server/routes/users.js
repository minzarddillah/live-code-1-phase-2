const router = require('express').Router()
const User = require('../models/User')
const encrypt = require('../helpers/hash')
const { sign } = require('../helpers/jwt')

router.post('/register', function(req,res){
    let newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: encrypt(req.body.email, req.body.password)
    })

    newUser
        .save()
        .then(user =>{
            res.status(200).json({
                success: true,
                message: `Account ${user.name} registered`
              })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

router.post('/login', function(req,res){
    let idUser
    User
        .findOne({
            email: req.body.email,
            password: encrypt(req.body.email, req.body.password)
        })
        .then(user =>{
            if(user){
                idUser = user._id
                return sign(user)
            }else{
                res.status(404).json({
                    message: 'EMAIL ATAU PASSWORD SALAH'
                })
            }
        })
        .then(token =>{
            res.status(200).json({
                token: token,
                id: idUser
            })
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})


module.exports = router