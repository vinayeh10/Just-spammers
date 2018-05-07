var express = require('express');
var router = express.Router();
var jwt = require('jsonwebtoken');
var User = require('../models/user')

var Message = require('../models/messages');




router.get('/',function(req,res,next){
    Message.find().populate('user','firstName').exec(function(err,messages){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: {err:err,message:'Failed to load messages! service unavailable'}
            })
        }
        res.status(200).json({
            message:"success",
            obj:messages,
        });
        
    });
});

router.use('/',function(req,res,next){
    jwt.verify(req.query.token,'secret',function(err,decoded){
        if(err){
            return res.status(401).json({
                title:'User Not Logged In',
                error:{err:err,message:'Please Login to continue'}
            })
        }
        next();
    })
})

router.post('/', function (req, res, next) {
    var decoded = jwt.decode(req.query.token)
    
    User.findById(decoded.User._id,function(err,user){
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        var message = new Message({
            content: req.body.content,
            user:user._id
        });
        message.save(function (err, result) {    
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred in saving',
                    error: err
                });
            }
            user.messages.push(result);
            user.save();
            res.status(201).json({
                message: 'Saved message',
                obj: result,
                userName:user.firstName
            });
        });

    })
    
});

//to update or edit current message

router.patch('/:id',function(req,res,next){
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id,function(err,message){
        if(err){
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            }); 
        }
        if(!message){
            res.status(500).json({
                message: 'Message not found',
                obj: {message:'Sorry! Message you want to edit is not available please try after some time'}
            }); 
        }
        if(message.user != decoded.User._id){
            res.status(201).json({
                title:'Invalid user',
                obj:{message:'sorry you do not have permission to edit this message'}
            })
        }
        message.content = req.body.content
        message.save(function (err, result) {    
            if (err) {
                return res.status(500).json({
                    title: 'An error occurred in update',
                    error: err
                });
            }
            res.status(201).json({
                message: 'Message updated',
                obj: result
            });
        });
    })
})

router.delete('/:id', function (req, res, next) {
    var decoded = jwt.decode(req.query.token);
    Message.findById(req.params.id, function (err, message) {
        if (err) {
            return res.status(500).json({
                title: 'An error occurred',
                error: err
            });
        }
        if (!message) {
            return res.status(500).json({
                title: 'No Message Found!',
                error: {message: 'Sorry Message not found please try after some time'}
            });
        }
        if (message.user != decoded.User._id) {
            return res.status(401).json({
                title: 'Not Authenticated',
                error: {message: 'Sorry! you do not have permission to edit this message'}
            });
        }
        message.remove(function (err, result) {
            if (err) {
                return res.status(500).json({
                    title: 'Message deletion failed',
                    error: {err:err,message:'Please try after some time'}
                });
            }
            res.status(200).json({
                message: 'Deleted message',
                obj: result
            });
        });
    });
});

module.exports = router;