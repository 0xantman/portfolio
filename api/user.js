const express = require('express');
const userRouter = express.Router();
const sqlite3 = require('sqlite3');
const jwt = require('jsonwebtoken');

const db = new sqlite3.Database('./db/database.db', (err) =>{
    if(err){
        console.error(err.message);
    }
    console.log('conected to the db')
});
const jwtPass = "Eq293kdf.fdfd4943deLoki";

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
                    //req.count = row.length;
                    req.access = jwt.sign({user: req.body.email}, jwtPass);
                    //req.session.authUser = {username: req.body.email};
                    //console.log(req.session.admin);
                    next();
                }else{
                    res.status(404).send()
                }
                
            }
        });
        
    }else{
        res.status(404).send();
    }
});

userRouter.use(['/user/:id', '/user/profile/:id'], (req, res, next) =>{
    if(req.headers.authorization){
        const headerSplit = req.headers.authorization.split(' ');
        const token = headerSplit[1];
        //console.dir(token);
        // verify a token symmetric
        jwt.verify(token, jwtPass, function(err, decoded) {
            //console.log(decoded) // bar
            if(!err){
                next();
                //res.status(200).json({data: "clean"});
            }else{
                //res.clearCookie("auth._token.local");
                //next(err);
                res.status(403).send();
            }
        });
    }else{
        res.status(403).send();
    }
});

userRouter.post('/login', (req, res, next) =>{
    res.status(200).json({token: req.access});
})

//profile at home page public api
userRouter.get('/profile', (req, res, next) =>{
    //console.log(req.session);
    db.get("SELECT * FROM Admin", (err, row) =>{
        if(err){
            res.status('404').send();
        }else{
            const data = {
                fullname : row.full_name,
                birthday : row.birthday,
                biography : row.biography,
                username : row.username,
                website : row.website_link,
                image : row.image,
                email: row.email

            }
            res.status(200).json({profile: data});
        }
    })
})

userRouter.get('/user/profile', (req, res, next) =>{

    db.get("SELECT * FROM Admin", (err, row) =>{
        if(err){
            res.status('404').send();
        }else{
            const data = {
                email : row.email,
                image : row.image,
                fullname : row.full_name,
                birthday : row.birthday,
                biography : row.biography,
                username : row.username,
                website : row.website_link,
                
            }
            res.status(200).json({profile: data});
        }
    });
})

userRouter.post('/user/profile/update', (req, res, next) =>{
    const data = req.body;
    const updateData ={
        $email : data.email.trim(),
        $image : data.image,
        $fullname : data.fullname,
        $birthday : data.birthday,
        $biography : data.biography,
        $username : data.username,
        $website : data.website
    }
    db.run(`UPDATE Admin SET 
        email = $email, 
        image = $image,
        full_name = $fullname,
        birthday = $birthday,
        biography = $biography,
        username = $username,
        website_link = $website`, updateData, (err, success) =>{
            if(err){
                console.error(err);
                res.status('404').send();
            }else{
                res.status(200).json({update: 'ok'});
            }
        });
});

userRouter.get('/user/inbox/news', (req, res, next) =>{
    db.all("SELECT * FROM Message WHERE unread = 0", (err, rows) => {
        if(err){
            res.status(404).send()
            
        }else{
            if(rows){
                const news = [];

                rows.forEach( dataNews => {
                    const json = {
                        date: dataNews.date_time,
                        email: dataNews.email,
                        id: dataNews.id
                    }
                    news.push(json);
                })
                
                res.status(200).json({new : news, inbox: true})
            }
            else{
                res.status(200).json({inbox: false})
            }
        }
    })
});

module.exports = userRouter;