const express = require('express');
const inboxesRouter = express.Router();
const admin = require('firebase-admin');
const firebase = require('../firebase/firebase-config')
const database = firebase.database();

inboxesRouter.post('/', (req, res, next) =>{
    
    if(req.body.email && req.body.subject && req.body.message){
        
        firebase.database().ref('inboxes/').push({
            email : req.body.email,
            subject : req.body.subject,
            message : req.body.message,
            read : false,
            archive : false,
            date_time : Date.now()
          }, (err) =>{
            if(err){
                console.error(err);
                res.status(404).json({err: true})
            }else{
                res.status(200).json({data: true})
            }
          });

    }else{
        res.status(400).json({err: true});
    }
    
})

module.exports = inboxesRouter;