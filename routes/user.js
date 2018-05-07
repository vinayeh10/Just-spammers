var express = require('express');
var router = express.Router();
var bcrypt = require('bcryptjs');
var User = require('../models/user');
var jwt = require('jsonwebtoken');

router.post('/', function (req, res, next) {
    var user = new User({
       firstName :  req.body.firstName,
       lastName : req.body.lastName,
       password : bcrypt.hashSync(req.body.password,10),
       email : req.body.email
    });

    user.save(function(err,result){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            }); 
        }
        res.status(201).json({
            title:'user created',
            obj:result
        });
    });

});

router.post('/signin',function(req,res,next){
    User.findOne({email:req.body.email},function(err,response){
        if(err){
            return res.status(500).json({
                title:'error occured',
                error:err
            });
        }
        if(!response){
            return res.status(401).json({
                title:'Invalid Credentials',
                error:{message:'Please check entered details'}
            });
        }
        if(!bcrypt.compareSync(req.body.password,response.password)){
            return res.status(401).json({
                title:'Invalid Credentials',
                error:{message:'Entered password is invalid, please enter correct password'}
            });
        }
        var token = jwt.sign({User:response},'secret',{expiresIn:7200});
        res.status(201).json({
            title:'user logged in',
            token:token,
            UserName:response.firstName,
            userId:response._id
        });
    })
})

module.exports = router;