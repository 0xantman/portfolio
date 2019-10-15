const express = require('express');
const userRouter = express.Router();
const sqlite3 = require('sqlite3');


const db = new sqlite3.Database('./db/database.db', (err) =>{
    if(err){
        console.error(err.message);
    }
    console.log('conected to the db')
});

userRouter.use('/login', (req, res, next) =>{
    //console.log(req.body);
    if(req.body.password && req.body.email){
        const login = {
            $email: req.body.email,
            $password: req.body.password
        }

        db.get("SELECT * FROM Admin WHERE email = $email AND password = $password", login, (err, row) =>{
            if(err){
                res.status(404).send()
            }else{
                if(row){
                    req.count = row.length;
                    req.session.admin = true;
                    console.log(req.session.admin);
                    next();
                }else{
                    res.status(404).send()
                }
                
            }
        });
        
    }else{
        res.status(404).send();
    }
})

userRouter.post('/login', (req, res, next) =>{
    res.status(200).json({data: req.count});

})

userRouter.get('/backend', (req, res, next) =>{
    console.log(req.session.admin);
    if(req.session.admin){
        res.status(200).json({data: "clean"});
    }else{
        res.status(404).send();
    }
    

})

userRouter.get('/profile', (req, res, next) =>{
    console.log(req.session);
    db.get("SELECT * FROM Admin", (err, row) =>{
        if(err){
            res.status('404').send();
        }else{
            const data = {
                fullname : row.full_name,
                birthday : row.birthday,
                biography : row.biography,
                username : row.username,
                website : row.website_link
            }
            res.status(200).json({profile: data});
        }
    })
})

module.exports = userRouter;