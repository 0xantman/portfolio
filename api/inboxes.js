const express = require('express');
const inboxesRouter = express.Router();
const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./db/database.db', (err) =>{
    if(err){
        console.error(err.message);
    }
    console.log('conected to the db')
});


inboxesRouter.get('/', (req, res, next) =>{
    res.status(200).json({data: 'ok'});
})

inboxesRouter.post('/', (req, res, next) =>{
    
    if(req.body.email && req.body.subject && req.body.message){
        db.run(`INSERT INTO Message(email, subject, message) VALUES($email, $subject, $message)`,{
            $email: req.body.email,
            $subject: req.body.subject,
            $message: req.body.message
        }, function(err){
            if(err){
                return console.log(err.message);
            }
            
            db.get("SELECT * FROM Message WHERE id = $lastID",{
                $lastID : this.lastID
            }, (err, row) =>{
                if(err){
                    res.status(404).json({err: true})
                }else{
                    res.status(200).json({data: row})
                }
            });
            
        });
    }else{
        res.status(400).json({err: true});
    }
    
})

module.exports = inboxesRouter;