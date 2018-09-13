const ObjectId = require('mongoose').Types.ObjectId
const router = require('express').Router()
const { auth, itSelf } = require('../helpers/auth')
const Quote = require('../models/Quote')
const User = require('../models/User')
const { verify } = require('../helpers/jwt')
const { Translate } = require('@google-cloud/translate');

router.get('/', function(req,res){
    Quote
        .find()
        .then(quotes =>{
            res.status(200).json(quotes)
        })
        .catch(err =>{
            res.status(500).json(err)
        })
})

router.post('/', auth, function(req,res){
    let token = req.headers.token
    let newQuote = new Quote({
        status: req.body.status,
    })
    verify(token)
    .then(decoded =>{
        return User.findById(ObjectId(decoded._id))
    })
    .then(user =>{
        newQuote.user = ObjectId(user._id)
        user.quotes.push(ObjectId(newQuote._id))
        return user.save()
    })
    .then(updatedUser =>{
        return newQuote.save()
    })
    .then(newQuote =>{
        res.status(200).json(newQuote)
    })
    .catch(err =>{
        res.status(500).json(err)
    })
})

router.delete('/:id', auth, itSelf, function(req,res){
    console.log(`masuk`)
    let idQuote = req.params.id

    Quote
        .findByIdAndRemove(ObjectId(idQuote))
        .then(quote =>{
            if(quote){
                res.status(200).json({
                    success: true,
                    message: `Quote with id ${quote._id} deleted`
                })
            }else{
                res.status(404).json({
                    success: false,
                    message: `can't find a quote`
                })
            }
        })
        .catch(err =>{

        })
})

router.post('/translate', function(req,res){
    const projectId = process.env.TRANSLATEID;

    const translate = new Translate({
        projectId: projectId,
    });
    const text = req.body.status

    const target = 'us'

    translate
        .translate(text, target)
        .then(results => {
            const translation = results[0];
        
            console.log(`Text: ${text}`);
            console.log(`Translation: ${translation}`);
        })
        .catch(err => {
            console.error('ERROR:', err);
        });
})



module.exports = router