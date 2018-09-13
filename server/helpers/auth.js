const ObjectId = require('mongoose').Types.ObjectId
const User = require('../models/User')
const { verify } = require('../helpers/jwt')

module.exports = {
    auth: function(req,res,next){
        let token = req.headers.token
        verify(token)
        .then(decoded =>{
            return User.findOne({
                _id: ObjectId(decoded._id),
                name: decoded.name,
                email: decoded.email
            })
        })
        .then(user =>{
            if(user){
                next()
            }else{
                res.status(401).json({
                    message: 'Login terlebih dahulu'
                })
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })
    },

    itSelf: function(req,res,next){
        let token = req.headers.token
        let quoteId = req.params.id
        verify(token)
        .then(decoded =>{
            return User.findOne({
                _id: ObjectId(decoded._id),
                name: decoded.name,
                email: decoded.email
            })
        })
        .then(user =>{
            // console.log(user)
            let quotes = user.quotes
            let  itSelf = false
            for(let i = 0 ; i < quotes.length ; i++){
                if(String(quotes[i]) === String(quoteId)){
                    // next()
                    itSelf = true
                }
            }
            if(itSelf){
                next()
            }else{

                res.status(401).json({message: 'TIDAK ADA ACCESS'})
            }
        })
        .catch(err =>{
            res.status(500).json(err)
        })        
    }
}